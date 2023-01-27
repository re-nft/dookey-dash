import "@/styles/globals.scss";
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Networks,
  NFTFetchConfiguration,
  Strategies,
} from "@zoralabs/nft-hooks";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { WagmiConfig } from "wagmi";

import { BaseLayout } from "@/react/layout";
import {
  getProductionWagmiClient,
  getTestWagmiClient,
} from "@/react/wagmi-config";

const zdkStrategy = new Strategies.ZDKFetchStrategy(Networks.MAINNET);

const queryClient = new QueryClient();

const { chains, client } =
  (process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV) !== "test"
    ? getProductionWagmiClient()
    : getTestWagmiClient();

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session?: Session;
}>) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore development client incompatibility
    <WagmiConfig client={client}>
      <NFTFetchConfiguration
        strategy={zdkStrategy}
        networkId={Networks.MAINNET}
      >
        <SessionProvider session={pageProps?.session}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider chains={chains} coolMode>
              <QueryClientProvider client={queryClient}>
                <BaseLayout>
                  <Component {...pageProps} />
                </BaseLayout>
              </QueryClientProvider>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </NFTFetchConfiguration>
    </WagmiConfig>
  );
}

export default MyApp;
