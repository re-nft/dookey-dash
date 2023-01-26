interface ListItemProps {
  readonly title: React.ReactNode;
  readonly children?: React.ReactNode;
}
export const ListItem = ({ title, children }: ListItemProps) => {
  return (
    <article className="w-full flex flex-row flex-wrap gap-6 p-6 bg-white rounded-lg justify-between items-center">
      <h3>{title}</h3>
      <div className="flex flex-row gap-6 justify-between items-center">
        {children}
      </div>
    </article>
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
