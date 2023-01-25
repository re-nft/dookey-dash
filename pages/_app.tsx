import '../styles/globals.css';
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import {
  connectorsForWallets,
  RainbowKitProvider,
  type Wallet as RainbowkitWallet,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { foundry } from '@wagmi/core/chains';
import { MockConnector } from '@wagmi/core/connectors/mock';
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc';
import { providers, Wallet } from 'ethers';

const TESTNET_URL =
  process.env.NEXT_PUBLIC_TESTNET_URL || 'http://localhost:8545';
const TESTNET_WALLET_KEY = process.env.NEXT_PUBLIC_TESTNET_WALLET_KEY;

const signer = TESTNET_WALLET_KEY
  ? new Wallet(TESTNET_WALLET_KEY, new providers.JsonRpcProvider(TESTNET_URL))
  : Wallet.createRandom();

const mockWallet = (): RainbowkitWallet => ({
  createConnector: () => ({
    connector: new MockConnector({
      chains: [foundry],
      options: {
        flags: {
          failConnect: false,
          failSwitchChain: false,
          isAuthorized: true,
          noSwitchChain: false,
        },
        signer,
      },
    }),
  }),
  id: 'mock',
  iconBackground: 'tomato',
  iconUrl: async () => 'http://placekitten.com/100/100',
  name: 'Mock Wallet',
});

const connectors = connectorsForWallets([
  {
    groupName: 'Testing',
    wallets: [mockWallet()],
  },
]);

const { chains, provider, webSocketProvider } = configureChains(
  [foundry],
  [jsonRpcProvider({ rpc: () => ({ http: TESTNET_URL }) })]
);

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
});

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
            <Component {...pageProps} />
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
