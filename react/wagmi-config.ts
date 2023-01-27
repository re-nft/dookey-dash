import {
  type Wallet as RainbowkitWallet,
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { foundry } from "@wagmi/core/chains";
import { MockConnector } from "@wagmi/core/connectors/mock";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { providers, Wallet } from "ethers";
import { configureChains, createClient, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const TESTNET_URL =
  process.env.NEXT_PUBLIC_TESTNET_URL || "http://localhost:8545";

const TESTNET_WALLET_KEY = process.env.NEXT_PUBLIC_TESTNET_WALLET_KEY;

const signer = TESTNET_WALLET_KEY
  ? new Wallet(TESTNET_WALLET_KEY, new providers.JsonRpcProvider(TESTNET_URL))
  : Wallet.createRandom();

const mockConnector = new MockConnector({
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
});

const mockWallet = (): RainbowkitWallet => ({
  createConnector: () => ({
    connector: mockConnector,
  }),
  id: "mock",
  iconBackground: "tomato",
  iconUrl: async () => "http://placekitten.com/100/100",
  name: "Mock Wallet",
});

export const connectors = connectorsForWallets([
  {
    groupName: "Testing",
    wallets: [mockWallet()],
  },
]);

export const { chains, provider, webSocketProvider } = configureChains(
  [foundry],
  [jsonRpcProvider({ rpc: () => ({ http: TESTNET_URL }) })]
);

export const productionClient = createClient({
  autoConnect: true,
  ...configureChains([mainnet], [publicProvider()]),
  ...getDefaultWallets({
    // TODO: App name????
    appName: "reDOOKEY",
    chains: [mainnet],
  }),
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export const mockWagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [mockConnector],
});