interface ListItemProps {
  readonly title: React.ReactNode;
  readonly children?: React.ReactNode;
  readonly actions?: React.ReactNode;
}
export const ListItem = ({ title, actions, children }: ListItemProps) => {
  return (
    <div className="table-row bg-white text-black border-t-gray-900 border-t-2">
      <div className="table-cell items-center px-6 py-4 text-gray-900 whitespace-nowrap">
        {title}
      </div>
      <div className="table-cell px-6 py-4">{children}</div>
      <div className="table-cell px-6 py-4">{actions}</div>
    </div>
  );
};

interface WaitingRoomListItemProps {
  address: string;
  onClick?: () => void;
  connected: boolean;
}
export const WaitingRoomListItem = ({
  address,
  onClick,
  connected,
}: WaitingRoomListItemProps) => (
  <ListItem
    title={
      <span className="font-light">
        User <b className="font-bold">{address}</b> is waiting to play Dookey
        Dash
      </span>
    }
  >
    {connected && (
      <button className="button-standard" onClick={onClick}>
        DELEGATE
      </button>
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
  <ListItem
    title={
      <span className="font-light">
        User <b className="font-bold">{address}</b> can play Dookey Dash
      </span>
    }
  >
    <b className="font-bold">Sewer Pass Tier {sewerPassTier}</b>
    <button className="button-standard" onClick={onClick}>
      REVOKE
    </button>
  </ListItem>
);
