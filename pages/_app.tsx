import "@/styles/globals.scss";
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { WagmiConfig } from "wagmi";

import { BaseLayout } from "@/layout";
import { chains, wagmiClient } from "@/utils/wagmi-config";

const queryClient = new QueryClient();

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session?: Session;
}>) {
  console.log(pageProps?.session);
  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider session={pageProps?.session}>
        <RainbowKitSiweNextAuthProvider>
          <RainbowKitProvider chains={chains}>
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
