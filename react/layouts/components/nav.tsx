import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

import { Image } from "@/react/components/Image";

const navLinks =
  "text-[9px] mx-1 text-[#A855F7] whitespace-nowrap md:text-sm md:mx-4";

export const Nav = ({ className = "" }: { className?: string }) => {
  return (
    <nav
      className={`w-full flex flex-row justify-between items-center p-4 ${className}`}
    >
      <div className="flex flex-row flex-nowrap gap-4 items-center">
        <div className="flex-auto grow flex flex-col">
          <span className="text-[6px] text-[#000000] md:text-[9px]">
            Powered By
          </span>
          <a
            href="https://dookeydash.com"
            target="_blank"
            className="link-standard"
            rel="noopener noreferrer"
          >
            <Image
              className="inline-block"
              src="/renft-logo-black-and-white.svg"
              fallbackSrc="/renft-logo-black-and-white.svg"
              width="100"
              height="100"
              alt="reNFT"
              style={{ width: 160 }}
            />
          </a>
        </div>
        <div className="flex-auto grow flex flex-row w-32 md:w-auto">
          <a className={`${navLinks} font-semibold`} href="/">
            Waiting Room
          </a>
          <a className={`${navLinks}`} href="/">
            Twitter
          </a>
        </div>
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

      <div className="flex-auto grow-0 flex flex-row items-center w-80 md:w-auto">
        <a className={`${navLinks}`} href="/">
          My Sewer Pass
        </a>
        <span className="nav-provider-connect-btn">
          <ConnectButton showBalance={false} />
        </span>
      </div>
    </nav>
  );
};
