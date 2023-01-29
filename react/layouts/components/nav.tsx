import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAccount } from "wagmi";

export const Nav = ({ className = "" }: { className?: string }) => {
  const { address } = useAccount();
  return (
    <nav
      className={`w-full flex flex-row justify-between items-center p-4 ${className}`}
    >
      <div className="flex flex-row gap-4 items-center">
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
        <Link href="https://dookeydash.com">
          <button className="link-standard">Play Dookey Dash</button>
        </Link>
      </div>
      <ConnectButton />
    </nav>
  );
};
