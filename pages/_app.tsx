import "@/styles/globals.scss";
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { WagmiConfig } from "wagmi";

import { BaseLayout } from "@/react/layout";
import {
  getDevelopmentWagmiClient,
  getProductionWagmiClient,
} from "@/react/wagmi-config";

const queryClient = new QueryClient();

const { chains, client } =
  process.env.NEXT_PUBLIC_IS_PRODUCTION === "true"
    ? getProductionWagmiClient()
    : getDevelopmentWagmiClient();

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
    </WagmiConfig>
  );
}

export default MyApp;
