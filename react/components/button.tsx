import React, {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
} from "react";

import c from "./button.module.css";

const twClass = [
  "block",
  "bg-renft-purple",
  "font-bold",
  "m-3",
  "px-5",
  "py-3",
  "rounded",
  "shadow-md",
  "text-dookey-green",
  "uppercase",
  c.poop,
].join(" ");

export const Button = ({
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return <button {...props} className={`${twClass} ${className}`} />;
};
