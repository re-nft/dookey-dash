import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAccount } from "wagmi";

export const Nav = () => {
  const { isConnected } = useAccount();

  return (
    <nav className="w-full flex flex-row justify-between items-center">
      <div className="flex flex-row gap-4 items-center">
        <Link href="/" className="mr-6">
          <img src="/logo.svg" alt="reNFT" />
        </Link>
        <Link href="/waiting-room" className="link-standard">
          Waiting Room
        </Link>
        <Link
          href="/my-delegations"
          className={`link-standard ${!isConnected && "link-disabled"}`}
        >
          My Delegations
        </Link>
        <Link href="/faq">
          <button className="link-standard">FAQ</button>
        </Link>
      </div>
      <ConnectButton />
    </nav>
  );
};