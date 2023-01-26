import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Story } from "@storybook/react";
import React from "react";
import { WagmiConfig } from "wagmi";

import { chains, mockWagmiClient, wagmiClient } from "@/react/wagmi-config";

export const MockWagmiDecorator = (Story: Story) => {
  return (
    <WagmiConfig client={mockWagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Story />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
export const WagmiDecorator = (Story: Story) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Story />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
