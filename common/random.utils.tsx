import {create} from "random-seed";
import * as React from "react";

type WaitingString = {
  readonly prefix: React.ReactNode;
  readonly suffix: React.ReactNode;
};

const WAITING_STRINGS: readonly WaitingString[] = [
  {prefix: "", suffix: " nearly got drained on the way over here." },
  {prefix: "", suffix: " may look dumb, but... No wait, that's everything." },
  {prefix: "", suffix: " seems like a good bet. Smells like a sewer." },
  {prefix: "", suffix: " got tired of paper-handed flipping ape derivatives."},
  {prefix: "", suffix: " quit their day job to flip NFTs. How is that going by the way?"},
  {prefix: "", suffix: " just finished their shift at McDonalds."},
  {prefix: "If unicode had stink lines, we'd be drawing them on ", suffix: "."},
  {prefix: "", suffix: ' told their boss they were conducting "fintech research" just to be here.'},
  {prefix: "", suffix: " still dabbles in food tokens."},
  {prefix: "", suffix: " is fresh from the sewers."},
  {prefix: "", suffix: ", JPEG connoisseur. Ooh la la!"},
  {prefix: "", suffix: " (not financial advice)"},
  {prefix: "", suffix: " firmly believes TA is astrology for degens."},
  {prefix: "", suffix: " still thinks there's a future in BitConnect."},
  {prefix: "", suffix: " doesn't have game. Literally."},
  {prefix: "", suffix: " a.k.a  Queen of the Rats"},
  {prefix: "", suffix: ", renowned rug pull survivor. "},
];

export const getRandomWaitingString = (address: string): WaitingString => {
  return WAITING_STRINGS[create(address).intBetween(0, WAITING_STRINGS.length)];
};
