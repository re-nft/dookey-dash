import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAccount } from "wagmi";

export const Nav = ({ className = "" }: { className?: string }) => {
  return (
    <nav
      className={`w-full flex flex-row justify-between items-center p-4 ${className}`}
    >
      <div className="flex flex-row gap-4 items-center">
        <Link href="/" className="link-standard">
          Waiting Room
        </Link>
        <a
          href="https://dookeydash.com"
          target="_blank"
          className="link-standard"
          rel="noopener noreferrer"
          children="Play Dookey Dash"
        />
        <a
          href="https://opensea.io/collection/sewerpass"
          target="_blank"
          className="link-standard"
          rel="noopener noreferrer"
          children="OpenSea"
        />
      </div>
      <ConnectButton />
    </nav>
  );
};
