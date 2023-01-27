import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Story } from "@storybook/react";
import React from "react";
import { WagmiConfig } from "wagmi";

import { getMockWagmiClient, getTestWagmiClient } from "@/react/wagmi-config";

const { client: mockClient, chains: mockChains } = getMockWagmiClient();
const { client: developmentClient, chains: developmentChains } =
  getTestWagmiClient();

export const MockWagmiDecorator = (Story: Story) => {
  return (
    <WagmiConfig client={mockClient}>
      <RainbowKitProvider chains={mockChains}>
        <Story />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
export const WagmiDecorator = (Story: Story) => {
  return (
    <WagmiConfig client={developmentClient}>
      <RainbowKitProvider chains={developmentChains}>
        <Story />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
