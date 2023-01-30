import Link from "next/link";
import { useAccount } from "wagmi";

import { compareAddresses } from "@/common/address.utils";
import { getRandomWaitingString } from "@/common/random.utils";
import { PlayerWithDookeyStats } from "@/common/stats.utils";
import { Button } from "@/react/components/button";
import Jazzicon from "@/react/components/jazzicon";

import c from "./list-item.module.css";

const twClass = [
  "flex",
  "flex-col",
  "md:flex-row",
  "wrap",
  "align-center",
  "rounded-md",
  "mx-10",
  "my-8",
  "px-6",
  "py-4",
  "text-lg",
  "bg-dookey-green",
  "text-xl",
  "text-renft-purple",
  c.poop,
].join(" ");

export const ListItem = ({
  children,
  className,
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return <article className={`${twClass} ${className}`}>{children}</article>;
};

type WaitingRoomListItemProps = PlayerWithDookeyStats & {
  readonly hasBeenDelegatedToByCurrentUser?: boolean;
  readonly onClickDelegate?: () => void;
  readonly onClickRevoke?: () => void;
};
export const WaitingRoomListItem = ({
  address,
  score,
  onClickDelegate,
  onClickRevoke,
  hasBeenDelegatedToByCurrentUser,
}: WaitingRoomListItemProps) => {
  const { isConnected: connected, address: currentAddress } = useAccount();
  const { prefix, suffix } = getRandomWaitingString(address);
  const isCurrentUser = compareAddresses(address, currentAddress);
  return (
    <ListItem {...(isCurrentUser && { className: c.myPoop })}>
      <div className="flex flex-row grow order-1">
        <Jazzicon className="user-avatar grow-0 order-1" address={address} />
        <div className="pl-6 font-semibold grow order-2 flex-wrap inline-flex">
          {prefix}
          <div
            className={`bg-renft-purple px-2 text-dookey-green truncate underline font-bold mx-1 w-20 sm:w-auto ${c.poopAddress}`}
          >
            <Link href={`/${address}`}>{address}</Link>
          </div>
          {suffix} ({score}pts)
        </div>
      </div>
      {connected && !isCurrentUser && (
        <>
          <div className="flex grow-0 order-2 justify-self-end mt-5 md:mt-0">
            {hasBeenDelegatedToByCurrentUser ? (
              <Button className="grow-1" onClick={onClickRevoke}>
                REVOKE
              </Button>
            ) : (
              <Button className="grow-1" onClick={onClickDelegate}>
                ALLOW
              </Button>
            )}
          </div>
        </>
      )}
    </ListItem>
  );
};

interface MyDelegationListItemProps {
  address: string;
  onClick?: () => void;
  sewerPassTier: number;
}
export const MyDelegationListItem = ({
  address,
  onClick,
  sewerPassTier,
}: MyDelegationListItemProps) => (
  <ListItem>
    <div className="flex flex-row grow order-1">
      <Jazzicon className="user-avatar grow-0 order-1" address={address} />
      <div className="pl-6 font-semibold grow order-2 flex-wrap inline-flex">
        User
        <div
          className={`bg-renft-purple px-2 text-dookey-green truncate underline font-bold mx-1 w-20 sm:w-auto ${c.poopAddress}`}
        >
          <Link href={`/${address}`}>{address}</Link>
        </div>
        can play Dookey Dash
      </div>
    </div>
    <b className="font-bold">Sewer Pass Tier {sewerPassTier}</b>
    <div className="flex grow-0 order-2 justify-self-end mt-5 md:mt-0">
      <Button onClick={onClick}>REVOKE</Button>
    </div>
  </ListItem>
);
