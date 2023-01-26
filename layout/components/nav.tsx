import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Nav = () => {
  return (
    <nav className="w-full flex flex-row justify-between items-center">
      <img src="/logo.svg" alt="reNFT" />
      <ConnectButton />
    </nav>
  );
};
