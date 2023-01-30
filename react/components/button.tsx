import React, {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
} from "react";

import c from "./button.module.css";

const twClass = [
  "bg-renft-purple",
  "font-bold",
  "m-3",
  "md:px-4",
  "md:py-2",
  "md:w-auto",
  "p-6",
  "rounded",
  "shadow-md",
  "text-dookey-green",
  "uppercase",
  "w-full",
  c.poop,
].join(" ");

export const Button = ({
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return <button {...props} className={`${twClass} ${className}`} />;
};
