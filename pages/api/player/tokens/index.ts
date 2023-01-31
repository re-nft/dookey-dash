import { Alchemy, Network, Nft, OwnedNft } from "alchemy-sdk";
import { DelegateCash } from "delegatecash";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

import { compareAddresses } from "@/common/address.utils";
import { ErrorResponse } from "@/common/types";
import { CONTRACT_ADDRESS_SEWER_PASS } from "@/config";
import { env } from "@/server/env";

const settings = {
  apiKey: env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);
const provider = new ethers.providers.AlchemyProvider(
  "mainnet",
  env.ALCHEMY_API_KEY
);

const signer = ethers.Wallet.createRandom();

// HACK: Force delegateCash to instantiate with an incompatible provider.
Object.assign(provider, { getSigner: () => signer });

const delegateCash = new DelegateCash(provider);

type Result = {
  readonly ownedNfts: OwnedNft[];
  readonly delegatedNfts: Nft[];
  readonly delegatedToOthersNfts: Nft[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result | ErrorResponse>
) {
  const address = req.query.address || null;

  if (typeof address !== "string" || !ethers.utils.isAddress(address))
    return res
      .status(400)
      .json({ error: `Invalid address: ${String(address)}` });

  const { ownedNfts } = await alchemy.nft.getNftsForOwner(address, {
    contractAddresses: [CONTRACT_ADDRESS_SEWER_PASS],
  });

  const [delegationsByDelegate, tokenLevelDelegations] = await Promise.all([
    delegateCash.getDelegationsByDelegate(address),
    delegateCash.getTokenLevelDelegations(address),
  ]);

  const delegatedNftIds = delegationsByDelegate
    .filter(({ contract }) =>
      compareAddresses(contract, CONTRACT_ADDRESS_SEWER_PASS)
    )
    .map(({ tokenId, contract: contractAddress }) => ({
      tokenId: String(tokenId),
      contractAddress,
    }));

  const delegatedToOthersIds = tokenLevelDelegations
    .filter(({ contract }) =>
      compareAddresses(contract, CONTRACT_ADDRESS_SEWER_PASS)
    )
    .map(({ tokenId, contract: contractAddress }) => ({
      tokenId: String(tokenId),
      contractAddress,
    }));

  const delegatedNfts: Nft[] = delegatedNftIds.length
    ? await alchemy.nft.getNftMetadataBatch(delegatedNftIds)
    : [];

  const delegatedToOthersNfts: Nft[] = delegatedToOthersIds.length
    ? await alchemy.nft.getNftMetadataBatch(delegatedToOthersIds)
    : [];

  return res.status(200).json({
    ownedNfts,
    delegatedNfts,
    delegatedToOthersNfts,
  });
}
