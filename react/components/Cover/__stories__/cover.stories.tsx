import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Cover } from "../";

// ts-prune-ignore-next
export default {
  title: "Components/Cover",
  component: Cover,
} as ComponentMeta<typeof Cover>;

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
    <Cover
      title="Waiting room"
      intro="Users requesting to play Dookey Dash"
      image="/renft-cover.webp"
      fallBackImage="/renft-cover.webp"
    ></Cover>
  </div>
);

export const Playground: ComponentStory<typeof Cover> = (args) => (
  <Cover {...args} />
);

const PlaygroundArgs: React.ComponentProps<typeof Cover> = {
  children: (
    <>
      <button className="p-5 w-full m-3 bg-[#A855F7] shadow-md rounded text-white uppercase md:w-auto md:px-4 md:py-2">
        I Want to play
      </button>
      <button className="p-5 w-full m-3 bg-[#A855F7] shadow-md rounded text-white uppercase md:w-auto md:px-4 md:py-2 ">
        Let others Play
      </button>
    </>
  ),
  image: "/renft-cover.webp",
  title: "Waiting room",
  intro: "Users requesting to play Dookey Dash",
  fallBackImage: "/renft-cover.webp",
};

Playground.args = PlaygroundArgs;
