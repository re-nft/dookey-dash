import {create} from "random-seed";
import * as React from "react";

type WaitingString = {
  readonly prefix: React.ReactNode;
  readonly suffix: React.ReactNode;
};

const WAITING_STRINGS: readonly WaitingString[] = [
  {prefix: "", suffix: (
      <span>
        <span children=" is the type to get rekt just " />
        {/* TODO: Emphasis */}
        <span children="trying" />
        <span children=" to play." />
      </span>
    )},
  {prefix: "Wallet ", suffix: " nearly got drained on the way over here." },
  {prefix: "Wallet ", suffix: " may look dumb, but... No, that's everything." },
  {prefix: "", suffix: " seems like a good bet... they even smell like a sewer." },
  {prefix: "There's no wallet smellier than ", suffix: "" },
  {prefix: "", suffix: " got tired of paper-handed flipping ape derivatives."},
  {prefix: "", suffix: " quit their day job to flip NFTs. How is that going by the way?"},
  {prefix: "", suffix: " just finished their shift at McDonalds."},
  {prefix: "If unicode had stink lines, we'd be drawing them on ", suffix: "."},
  {prefix: "", suffix: ' told their boss they were conducting "fintech research" just to be here.'},
  {prefix: "", suffix: " still dabbles in food tokens."},
  {prefix: "", suffix: " is fresh from the sewers."},
  {prefix: "", suffix: ", JPEG connoisseur."},
  {prefix: "", suffix: " (not financial advice)"},
  {prefix: "", suffix: " once handed over their seed phrase to a badger."},
  {prefix: "", suffix: " believes TA is astrology for degens."},
];

export const getRandomWaitingString = (address: string): WaitingString => {
  return WAITING_STRINGS[create(address).intBetween(0, WAITING_STRINGS.length)];
};
