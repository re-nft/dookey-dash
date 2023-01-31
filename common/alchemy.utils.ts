import {ethers} from "ethers";

import {env} from "@/server/env";

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
