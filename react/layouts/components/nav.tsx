import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAccount } from "wagmi";

export const Nav = () => {
  const { address } = useAccount();
  return (
    <nav className="w-full flex flex-row justify-between items-center">
      <div className="flex flex-row gap-4 items-center">
        <Link href="/" className="mr-6">
          <img src="/logo.svg" alt="reNFT" />
        </Link>
        <Link href="/" className="link-standard">
          Waiting Room
        </Link>
        {Boolean(address) && (
          <Link href={`/${address}`} className="link-standard">
            My Profile
          </Link>
        )}
        <Link href="/faq">
          <button className="link-standard">FAQ</button>
        </Link>
      </div>
      <ConnectButton />
    </nav>
  );
};
