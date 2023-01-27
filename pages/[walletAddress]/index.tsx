import { useRouter } from "next/router";
import * as React from "react";
import { useAccount } from "wagmi";

import { compareAddresses } from "@/common/address.utils";
import { WalletCurrentUser,WalletOtherUser } from "@/react/wallets";

// TODO: Note this only works on production ATM, update your .env.
export default function WalletAddress(): JSX.Element {
  const { address } = useAccount();
  const { query } = useRouter();

  const isCurrentUser =
    typeof query.walletAddress === "string" &&
    compareAddresses(address, query.walletAddress);

  if (isCurrentUser) return <WalletCurrentUser />;

  return <WalletOtherUser />;
}
