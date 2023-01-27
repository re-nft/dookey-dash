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

const getDeveloperWagmiContext = () => {
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

  const { chains, provider, webSocketProvider } = configureChains(
    [foundry],
    [jsonRpcProvider({ rpc: () => ({ http: TESTNET_URL }) })]
  );

  return { provider, webSocketProvider, mockConnector, chains };
};

export const getProductionWagmiClient = () => {
  const { chains, provider } = configureChains([mainnet], [publicProvider()]);

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });

  const client = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return { client, chains };
};

export const getMockWagmiClient = () => {
  const { provider, webSocketProvider, mockConnector, chains } =
    getDeveloperWagmiContext();
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
    connectors: [mockConnector],
  });
  return { client, chains };
};

export const getDevelopmentWagmiClient = () => {
  const { provider, webSocketProvider, mockConnector, chains } =
    getDeveloperWagmiContext();

  const mockWallet = (): RainbowkitWallet => ({
    createConnector: () => ({
      connector: mockConnector,
    }),
    id: "mock",
    iconBackground: "tomato",
    iconUrl: async () => "http://placekitten.com/100/100",
    name: "Mock Wallet",
  });

  const connectors = connectorsForWallets([
    {
      groupName: "Testing",
      wallets: [mockWallet()],
    },
  ]);

  const client = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
  });

  return { client, chains };
};
