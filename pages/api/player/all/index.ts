import { loadEnvConfig } from "@next/env";
import { NextApiRequest, NextApiResponse } from "next";

import {
  ErrorResponse,
  IRegistryEntry,
  PaginatedResponse,
} from "@/common/types";
import { registry } from "@/mocks/registry.mock";
import { PlayerRegistryEntry } from "@/models/player.registry.entry.model";

const { combinedEnv } = loadEnvConfig(process.cwd());

const PAGE_SIZE_LIMIT = 30;

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
    nextPage: skip + limit < registry.length ? page + 1 : false,
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
    .sort({
      createdAt: "descending",
    })
    .lean();

  return {
    data: players.slice(0, limit),
    nextPage: players.length > limit ? page + 1 : false,
  };
};

type PaginatedPlayersResponse = PaginatedResponse<
  Omit<IRegistryEntry, "signature">
>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaginatedPlayersResponse | ErrorResponse>
) {
  const page = Number(req.query.page) || 0;
  const limit = Number(req.query.limit) || 5;

  if (limit > PAGE_SIZE_LIMIT)
    return res
      .status(400)
      .json({ error: `Limit cannot be greater than ${PAGE_SIZE_LIMIT}` });

  const response = combinedEnv.SERVE_MOCK_PLAYERS
    ? fetchMockPlayers({ page, limit })
    : await fetchPageOfPlayersFromMongo({ page, limit });

  // @ts-expect-error mock players are invalid
  return res.status(200).json(response);
}
