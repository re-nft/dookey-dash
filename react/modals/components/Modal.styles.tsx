import { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => (
  <aside className="flex flex-col items-center text-center text-xl text-white">
    {children}
  </aside>
);

export const Title = ({ children }: PropsWithChildren) => (
  <h2 className="font-bold text-dookey-green text-4xl">{children}</h2>
);

export const P = ({ children }: PropsWithChildren) => (
  <p className="m-10">{children}</p>
);
