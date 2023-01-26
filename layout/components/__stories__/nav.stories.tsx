import { ComponentMeta } from "@storybook/react";
import React from "react";

import { MockWagmiDecorator } from "@/utils/storybook-decorators";

import { Nav } from "../nav";

// ts-prune-ignore-next
export default {
  title: "Components/Nav",
  component: Nav,
  decorators: [MockWagmiDecorator],
} as ComponentMeta<typeof Nav>;

export const Default = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <Nav />
  </div>
);
