import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";
import {useAccount} from "wagmi";

const navLinks =
  "mx-1 text-[#A855F7] whitespace-nowrap md:text-base md:mx-4";

export const Nav = ({ className = "" }: { className?: string }) => {
  const {isConnected, address} = useAccount();
  return (
    <nav
      className={`w-full flex flex-row justify-between items-center p-4 ${className}`}
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
