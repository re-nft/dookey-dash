import "@/styles/fonts.scss";
import "tailwindcss/tailwind.css";
import "@/styles/globals.scss";
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { WagmiConfig } from "wagmi";

import { APP_ENV } from "@/config";
import { BaseLayout } from "@/react/layouts";
import { ModalProvider } from "@/react/modals/components/Modal.Provider";
import {
  getProductionWagmiClient,
  getTestWagmiClient,
} from "@/react/wagmi-config";

const queryClient = new QueryClient();

const { chains, client } =
  APP_ENV !== "test" ? getProductionWagmiClient() : getTestWagmiClient();

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
      <RainbowKitProvider chains={chains} coolMode>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
          </ModalProvider>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
