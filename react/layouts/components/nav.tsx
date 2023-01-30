import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

import { Image } from "@/react/components/Image";
import {useAccount} from "wagmi";

const navLinks =
  "text-[9px] mx-1 text-[#A855F7] whitespace-nowrap md:text-sm md:mx-4";

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

        <a className={`${navLinks}`} href="/">
          Twitter
        </a>

        {false && (
          <a
            href="https://opensea.io/collection/sewerpass"
            target="_blank"
            className="link-standard"
            rel="noopener noreferrer"
          >
            <Image
              className="inline-block"
              src="/opensea.png"
              fallbackSrc="/opensea.webp"
              width="100"
              height="100"
              alt="reNFT"
              style={{ width: 160 }}
            />
          </a>
        )}
      </div>

      {!!isConnected && (
        <a className={`${navLinks}`} href={`/${address}`}>
          My Sewer Pass
        </a>
      )}

      <span className="provider-connect-btn">
        <ConnectButton />
      </span>
    </nav>
  );
};
