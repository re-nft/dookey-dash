import { loadEnvConfig } from "@next/env";
import { NextApiRequest, NextApiResponse } from "next";

import { IRegistryEntry, PaginatedResponse } from "../../../../common/types";
import { registry } from "../../../../mocks/registry.mock";
import { PlayerRegistryEntry } from "../../../../models/player.registry.entry.model";

const { combinedEnv } = loadEnvConfig(process.cwd());

const fetchMockPlayers = ({ page, limit }: { page: number; limit: number }) => {
  const skip = page * limit;

  if (skip > registry.length) {
    return {
      data: [],
    };
  }

  const data = registry
    .slice(skip, skip + limit)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ signature, ...rest }) => rest);
  return {
    data,
    nextPage: skip + limit < registry.length ? page + 1 : undefined,
  };
};

const fetchPageOfPlayersFromMongo = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  // pull limit + 1 on purpose. if we get more than limit, we know there is a next page
  const players = await PlayerRegistryEntry.find()
    .select("-signature")
    .limit(limit + 1)
    .skip(page * limit)
    .sort("-createdAt")
    .lean();

  return {
    data: players.slice(0, limit),
    nextPage: players.length > limit ? page + 1 : undefined,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaginatedResponse<Omit<IRegistryEntry, "signature">>>
) {
  const page = Number(req.query.page) || 0;
  const limit = Number(req.query.limit) || 5;

  const response = combinedEnv.SERVE_MOCK_PLAYERS
    ? fetchMockPlayers({ page, limit })
    : await fetchPageOfPlayersFromMongo({ page, limit });

  return res.status(200).json(response);
}
