import {ethers} from "ethers";

import {env} from "@/server/env";
import {Alchemy, Network} from "alchemy-sdk";

export const getAlchemyApiKey = () => {
  if (env.NEXT_PUBLIC_ALCHEMY_API_KEY) return env.NEXT_PUBLIC_ALCHEMY_API_KEY;
  if (env.ALCHEMY_API_KEY) return env.ALCHEMY_API_KEY;

  // https://github.com/cawfree/react-native-helios/blob/64029d149eda3c6cb329ab129f64939b03cb6ac7/example/src/App.tsx#L15
  return "pPwfAKdQqDr1OP-z5Txzmlk0YE1UvAQT";
};

export const API_ALCHEMY_PROVIDER = new ethers.providers.AlchemyProvider(
  "mainnet",
  getAlchemyApiKey(),
);

const signer = ethers.Wallet.createRandom();

// HACK: Force delegateCash to instantiate with an incompatible provider.
Object.assign(API_ALCHEMY_PROVIDER, { getSigner: () => signer });

export const alchemy = new Alchemy({
  apiKey: getAlchemyApiKey(),
  network: Network.ETH_MAINNET,
});

const createHolderThunk = ({
  contractAddress,
}: {
  readonly contractAddress: string;
}) => {
  let ownerAddresses: readonly string[] | null = null;

  return async (): Promise<readonly string[]> => {
    if (ownerAddresses) return ownerAddresses;

    const {owners} = await alchemy.nft.getOwnersForContract(contractAddress);

    return ownerAddresses = owners;
  };
};

export const astroCatThunk = createHolderThunk({
  contractAddress: '0x0db8c099b426677f575d512874d45a767e9acc3c',
});
