import { loadEnvConfig } from "@next/env";
import { NextApiRequest, NextApiResponse } from "next";

import { registry } from "../../../../mocks/registry.mock";
import { PlayerRegistryEntry } from "../../../../models/player.registry.entry.model";

const { combinedEnv } = loadEnvConfig(process.cwd());

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

  if (combinedEnv.SERVE_MOCK_PLAYERS) {
    return res
      .status(200)
      .json({ OK: true, exists: registry.find((p) => p.address === address) });
  }

  const player = await PlayerRegistryEntry.findOne({
    address,
  }).lean();

  res.status(200).json({ OK: true, exists: Boolean(player) });
}
