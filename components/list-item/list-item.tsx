interface ListItemProps {
  readonly title: React.ReactNode;
  readonly slot1?: React.ReactNode;
  readonly slot2?: React.ReactNode;
}
export const ListItem = ({ title, slot1, slot2 }: ListItemProps) => {
  return (
    <article className="w-full flex flex-row flex-wrap gap-6 p-6 bg-white rounded-lg justify-between items-center">
      {title}
      <div className="flex flex-row gap-6 justify-between items-center">
        {slot1}
        {slot2}
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
    slot2={
      connected && (
        <button className="button-standard" onClick={onClick}>
          DELEGATE
        </button>
      )
    }
  />
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
    slot1={<b className="font-bold">Sewer Pass Tier {sewerPassTier}</b>}
    slot2={
      <button className="button-standard" onClick={onClick}>
        REVOKE
      </button>
    }
  />
);
