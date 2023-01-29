import {PlayerWithDookeyStats} from "@/common/stats.utils";
import Jazzicon from "@/react/components/jazzicon";

interface ListItemProps {
  readonly children?: React.ReactNode;
}
export const ListItem = ({ children }: ListItemProps) => {
  return (
    <div className="generic-list-item flex flex-col md:flex-row wrap align-center rounded-lg text-gray-900 mx-10 my-8 px-6 py-4 xs:text-xs sm:text-xs text-md text-left bg-white">
      {children}
    </div>
  );
};

type WaitingRoomListItemProps = PlayerWithDookeyStats & {
  onClick?: () => void;
  connected: boolean;
}
export const WaitingRoomListItem = ({
  address,
  score,
  onClick,
  connected,
}: WaitingRoomListItemProps) => (
  <ListItem>
    <div className="flex flex-row grow order-1">
      <Jazzicon className="user-avatar grow-0 order-1" address={address} />
      <div className="pl-6 font-semibold grow leading-10 order-2 flex-wrap inline-flex">
        User <div className="truncate mx-1 w-20 sm:w-auto">{address}</div> ({score}pts) is
        waiting to play Dookey Dash
      </div>
    </div>
    {connected && (
      <div className="grow-0 order-2 justify-self-end mt-5 md:mt-0">
        <button className="button-standard w-full md:w-auto" onClick={onClick}>
          ALLOW
        </button>
      </div>
    )}
  </ListItem>
);

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
      <div className="pl-6 font-semibold grow leading-10 order-2 flex-wrap inline-flex">
        User <div className="truncate mx-1 w-20 sm:w-auto">{address}</div> can
        play Dookey Dash
      </div>
    </div>
    <b className="font-bold">Sewer Pass Tier {sewerPassTier}</b>
    <div className="grow-0 order-2 justify-self-end mt-5 md:mt-0">
      <button className="button-standard w-full md:w-auto" onClick={onClick}>
        REVOKE
      </button>
    </div>
  </ListItem>
);
