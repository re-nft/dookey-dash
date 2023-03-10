import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

import {playerToPlayerWithDookeyStats} from "@/common/stats.utils";
import { registry } from "@/mocks/registry.mock";
import { env } from "@/server/env";
import { PlayerRegistryEntry } from "@/server/mongo/index";

const DOES_NOT_EXIST = "Does not exists";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ OK: false, error: "Method not allowed" });

  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ OK: false, error: "Address is required" });
  }

  if (typeof address !== "string" || !ethers.utils.isAddress(address))
    return res.status(400).json({ OK: false, error: "Invalid address" });

  if (env.SERVE_MOCK_PLAYERS === "true") {
    const mockPlayer = registry.find((p) => p.address === address);

    return res.status(200).json({
      OK: true,
      result: mockPlayer
        ? { ...mockPlayer, signature: undefined }
        : DOES_NOT_EXIST,
    });
  }

  const player = await PlayerRegistryEntry.findOne(
    {
      address,
    },
    "-signature"
  ).lean();

  if (!player) return res.status(404).json({ OK: false, error: "Player not found." });

  return res
    .status(200)
    .json({
      OK: true,
      result: await playerToPlayerWithDookeyStats(player),
    });
}
