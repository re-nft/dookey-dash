import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import {
  ListItem,
  MyDelegationListItem,
  WaitingRoomListItem,
} from "../list-item";

// ts-prune-ignore-next
export default {
  title: "Components/ListItem",
  component: ListItem,
  subcomponents: {
    MyDelegationListItem,
    WaitingRoomListItem,
  },
} as ComponentMeta<typeof ListItem>;

export const Default = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 8,
      backgroundColor: "gray",
      padding: "16px",
    }}
  >
    <MyDelegationListItem
      address="0x9Ce69a314330687f1fb1AD1d397A0bb55D5E1d22"
      sewerPassTier={4}
    />
    <WaitingRoomListItem
      address="0x9Ce69a314330687f1fb1AD1d397A0bb55D5E1d22"
      connected={false}
    />
    <WaitingRoomListItem
      address="0x9Ce69a314330687f1fb1AD1d397A0bb55D5E1d22"
      connected={true}
    />
  </div>
);

export const Playground: ComponentStory<typeof ListItem> = (args) => (
  <ListItem {...args} />
);

const PlaygroundArgs: React.ComponentProps<typeof ListItem> = {
  title: "Title",
  slot1: "Slot 1",
  slot2: <button className="button-standard">Slot 2</button>,
};

Playground.args = PlaygroundArgs;