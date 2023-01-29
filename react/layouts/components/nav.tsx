import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

export const Nav = ({ className = "" }: { className?: string }) => {
  return (
    <nav
      className={`w-full flex flex-row justify-between items-center p-4 ${className}`}
    >
      <div className="flex flex-row gap-4 items-center">
        <a
          href="https://dookeydash.com"
          target="_blank"
          className="link-standard"
          rel="noopener noreferrer">
          <img className="inline-block" src="/dookey.webp" alt="reNFT" style={{width: 160}} />
        </a>
        {false && (
          <a
            href="https://opensea.io/collection/sewerpass"
            target="_blank"
            className="link-standard"
            rel="noopener noreferrer">
            <img className="inline-block" src="/opensea.png" alt="reNFT" style={{width: 160}} />
          </a>
        )}
      </div>
      <ConnectButton />
    </nav>
  );
};
