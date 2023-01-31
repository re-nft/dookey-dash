import { create } from "random-seed";
import * as React from "react";

type WaitingString = {
  readonly prefix: React.ReactNode;
  readonly suffix: React.ReactNode;
};

const WAITING_STRINGS: readonly WaitingString[] = [
  { prefix: "", suffix: " may look dumb, but... No wait, that's everything." },
  { prefix: "", suffix: " seems like a good bet. Smells like a sewer." },
  {
    prefix: "",
    suffix: " got tired of paper-handed flipping ape derivatives.",
  },
  {
    prefix: "",
    suffix: " quit their day job to flip NFTs. How is that going by the way?",
  },
  { prefix: "", suffix: " just finished their shift at McDonalds." },
  {
    prefix: "If unicode had stink lines, we'd be drawing them on ",
    suffix: ".",
  },
  {
    prefix: "",
    suffix:
      ' told their boss they were conducting "fintech research" just to be here.',
  },
  { prefix: "", suffix: " still dabbles in food tokens." },
  { prefix: "", suffix: " is fresh from the sewers." },
  { prefix: "", suffix: ", JPEG connoisseur. Ooh la la!" },
  { prefix: "", suffix: " (not financial advice)" },
  { prefix: "", suffix: " firmly believes TA is astrology for degens." },
  { prefix: "", suffix: " still thinks there's a future in BitConnect." },
  { prefix: "", suffix: " doesn't have game. Literally." },
  { prefix: "", suffix: ", renowned rug pull survivor. " },
  { prefix: "", suffix: " dreams of a decentralized world." },
  { prefix: "", suffix: " got lost navigating the crypto world." },
  { prefix: "", suffix: " is all about yield farming, 24/7." },
  { prefix: "", suffix: " is waiting for the next bull market." },
  { prefix: "", suffix: " just took their first L." },
  { prefix: "", suffix: " thinks NFTs are the new potatoes." },
  {
    prefix: "",
    suffix: " still has trust issues from the great Ethereum crash of 2021.",
  },
  {
    prefix: "",
    suffix: " is considering a career change to a full-time meme trader.",
  },
  {
    prefix: "",
    suffix: " is pretty sure they just bought a piece of the moon.",
  },
  {
    prefix: "",
    suffix: " is hoping to one day retire on their Mekaverse collection.",
  },
  { prefix: "", suffix: " thinks the real gem in NFTs is the memes." },
  { prefix: "", suffix: ", collector of all things absurd." },
  { prefix: "", suffix: " (but only for the lols)" },
  {
    prefix: "",
    suffix: " firmly believes that HODL is a valid life strategy.",
  },
  { prefix: "", suffix: " a.k.a King of the Meme Trading Game" },
  { prefix: "", suffix: " thinks NFTs are like Pokemon, gotta catch 'em all." },
  {
    prefix: "",
    suffix:
      " still believes that their Bored Ape is worth more than their car.",
  },
  {
    prefix: "",
    suffix:
      " is convinced that the future of art is just memes on the blockchain.",
  },
  {
    prefix: "",
    suffix: " is pretty sure they just bought a piece of the sun, too.",
  },
  {
    prefix: "",
    suffix: " is hoping to retire on a beach made entirely of NFTs.",
  },
  {
    prefix: "",
    suffix: " still hasn't recovered from their CryptoKitties addiction.",
  },
  { prefix: "", suffix: " believes that memes are the new gold standard." },
  { prefix: "", suffix: " (for the lols and maybe some profits)" },
  { prefix: "", suffix: " firmly believes that HODL is the new YOLO." },
  { prefix: "", suffix: " a.k.a the Meme Trading Guru" },
];

const WAITING_STRINGS_ASTRO: readonly WaitingString[] = [
  { prefix: "", suffix: " is a legend." },
  { prefix: "", suffix: " is the goat 🐐" },
  { prefix: "", suffix: " is gonna make it!" },
];

export const getRandomWaitingString = (
  address: string,
  hasAstrocat: boolean
): WaitingString => {
  const rand = create(address);

  if (hasAstrocat)
    return WAITING_STRINGS_ASTRO[
      rand.intBetween(0, WAITING_STRINGS_ASTRO.length - 1)
    ];

  return WAITING_STRINGS[rand.intBetween(0, WAITING_STRINGS.length - 1)];
};
