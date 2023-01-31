import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";
import { useAccount } from "wagmi";

import c from "./nav.module.css";

const navLinks = `text-lg p-3 text-dookey-green whitespace-nowrap md:mx-4 ${c.poop}`;

export const Nav = ({ className = "" }: { className?: string }) => {
  const { isConnected, address } = useAccount();
  return (
    <nav
      className={`w-full flex flex-row flex-wrap items-center justify-center gap-4 p-4 ${className}`}
    >
      <div className="flex flex-row flex-nowrap gap-4 items-center">
        <Link href="/" className={`${navLinks} font-semibold`}>
          Waiting Room
        </Link>

        {Boolean(isConnected) && (
          <Link href={`/${address}`} className={`${navLinks} font-semibold`}>
            My Sewer Passes
          </Link>
        )}
      </div>

      <span className="provider-connect-btn">
        <ConnectButton />
      </span>
    </nav>
  );
};
