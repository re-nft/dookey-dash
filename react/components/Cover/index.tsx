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
      Request plays from Sewer Pass holders or allow others to play on your
      pass. All done through <a href="https://delegate.cash">delegate.cash</a>.
      Read the FAQ!
    </p>

    <p className="flex-auto grow-0 flex flex-row flex-wrap justify-center">
      {children}
    </p>
  </header>
);
