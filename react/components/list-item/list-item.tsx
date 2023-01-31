import * as React from "react";

import { getRandomWaitingString } from "@/common/random.utils";
import { PlayerWithDookeyStats } from "@/common/stats.utils";
import Jazzicon from "@/react/components/jazzicon";

import c from "./list-item.module.css";

interface ListItemProps {
  readonly children?: React.ReactNode;
  readonly className: string;
}

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
  "text-xl",
  "text-renft-purple",
  c.poop,
].join(" ");

export const ListItem = ({ children, className }: ListItemProps) => {
  return <article className={`${twClass} ${className}`}>{children}</article>;
};

type WaitingRoomListItemProps = PlayerWithDookeyStats & {
  readonly hasBeenDelegatedToByCurrentUser?: boolean;
};

export const WaitingRoomListItem = ({
  hasAstrocat,
  address,
  score,
}: WaitingRoomListItemProps) => {
  const { prefix, suffix } = getRandomWaitingString(address, hasAstrocat);
  return (
    <ListItem className={hasAstrocat ? "bg-dookey-gold" : "bg-dookey-green"}>
      <div className="flex flex-row grow order-1">
        <Jazzicon className="user-avatar grow-0 order-1" address={address} />
        <div className="pl-6 font-semibold grow order-2 flex-wrap inline-flex">
          {prefix}
          <div className="truncate font-bold mx-1 w-20 sm:w-auto">
            {address}
          </div>
          {suffix} ({score}pts){hasAstrocat ? " 🧑‍🚀 🐈 🌌" : ""}
        </div>
      </div>
    </ListItem>
  );
};

//interface MyDelegationListItemProps {
//  address: string;
//  onClick?: () => void;
//  sewerPassTier: number;
//}
//export const MyDelegationListItem = ({
//  address,
//  onClick,
//  sewerPassTier,
//}: MyDelegationListItemProps) => (
//  <ListItem>
//    <div className="flex flex-row grow order-1">
//      <Jazzicon className="user-avatar grow-0 order-1" address={address} />
//      <div className="pl-6 font-semibold grow order-2 flex-wrap inline-flex">
//        User <div className="truncate mx-1 w-20 sm:w-auto">{address}</div> can
//        play Dookey Dash
//      </div>
//    </div>
//    <b className="font-bold">Sewer Pass Tier {sewerPassTier}</b>
//    <div className="flex grow-0 order-2 justify-self-end mt-5 md:mt-0">
//      <Button onClick={onClick}>REVOKE</Button>
//    </div>
//  </ListItem>
//);
//
