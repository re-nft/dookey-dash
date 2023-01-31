import { ConnectButton } from "@rainbow-me/rainbowkit";
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
        <a className={`${navLinks} font-semibold`} href="/">
          Waiting Room
        </a>

        {Boolean(isConnected) && (
          <a className={`${navLinks} font-semibold`} href={`/${address}`}>
            My Sewer Pass
          </a>
        )}
      </div>

      <span className="provider-connect-btn">
        <ConnectButton />
      </span>
    </nav>
  );
};
