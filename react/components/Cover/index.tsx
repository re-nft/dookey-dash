import { type ReactNode } from "react";

import c from "./cover.module.css";

export const Cover = ({ children }: { children?: ReactNode }) => (
  <header className="my-20 text-center">
    <h1
      className={`text-7xl font-semibold mt-20 mb-10 capitalize text-dookey-green ${c.title}`}
    >
      Waiting Room
    </h1>

    <p className={`text-xl max-w-sm text-white mx-auto my-10 ${c.poop}`}>
      Request to play Dookey Dash from existing holders, or allow others to play
      with your pass to increase your odds of winning.
    </p>
    <p className={`text-xl max-w text-white mx-auto my-10 ${c.poop}`}>
      Made possible by <a href="https://delegate.cash">delegate.cash</a> and{" "}
      <a href="https://renft.io">renftlabs</a>!
    </p>

    <p className="flex-auto grow-0 flex flex-row flex-wrap justify-center">
      {children}
    </p>
  </header>
);
