import * as React from "react";

import c from "./modal.module.css";

const twClass = [
  "bg-renft-purple",
  "rounded rounded-lg",
  "p-10",
  "overflow",
].join(" ");

export const ModalLayout = React.memo(function ModalLayout({
  children,
  className,
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>): JSX.Element {
  return <div className={`${twClass} ${c.poop} ${className}`}>{children}</div>;
});
