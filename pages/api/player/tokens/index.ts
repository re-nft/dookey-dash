import { Nft, OwnedNft } from "alchemy-sdk";
import { DelegateCash } from "delegatecash";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

import { compareAddresses } from "@/common/address.utils";
import {API_ALCHEMY_PROVIDER, alchemy} from "@/common/alchemy.utils";
import { ErrorResponse } from "@/common/types";
import { CONTRACT_ADDRESS_SEWER_PASS } from "@/config";

const delegateCash = new DelegateCash(API_ALCHEMY_PROVIDER);

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
