import {Alchemy, Network, OwnedNft} from "alchemy-sdk";
import {ethers} from "ethers";
import {NextApiRequest, NextApiResponse} from "next";

import {ErrorResponse} from "@/common/types";
import {CONTRACT_ADDRESS_SEWER_PASS} from "@/config";

// TODO: env var
const ALCHEMY_API_KEY = "pPwfAKdQqDr1OP-z5Txzmlk0YE1UvAQT";

const settings = {
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OwnedNft[] | ErrorResponse>
) {
  const address = req.query.address || null;

  if (typeof address !== "string" || !ethers.utils.isAddress(address))
    return res
      .status(400)
      .json({ error: `Invalid address: ${String(address)}` });

  const {ownedNfts} = await alchemy.nft.getNftsForOwner(address, {contractAddresses: [CONTRACT_ADDRESS_SEWER_PASS]});

  return res.status(200).json(ownedNfts);
}
