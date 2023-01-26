import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { verifySignature } from "@/common/signature.utils";
import { PlayerRegistryEntry } from "@/server/mongo/index";

const PlayerRegistryEntrySchema = z.object({
  address: z.string().transform((address) => ethers.utils.getAddress(address)),
  signature: z.string(),
  message: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ OK: false, error: "Method not allowed" });

  // validate req body conforms to the schema
  const { address, signature, message } = PlayerRegistryEntrySchema.parse(
    req.body
  );

  // verify the signature
  const isValidSignature = verifySignature({
    signerAddress: address,
    rawMessage: message,
    signature,
  });

  if (!isValidSignature)
    return res.status(400).json({ OK: false, error: "Invalid signature" });

  // save it into the database
  await new PlayerRegistryEntry({
    address,
    message,
    signature,
    createdAt: new Date(),
    __v: 0,
  }).save();

  return res.status(201).json({ OK: true });
}
