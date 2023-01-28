import * as React from "react";
import InfiniteScroll, {
  Props as InfiniteScrollProps,
} from "react-infinite-scroll-component";

import { Player, usePlayers } from "@/react/api";

export type PlayersScrollProps = Omit<
  InfiniteScrollProps,
  "next" | "hasMore" | "loader" | "dataLength" | "children"
> & {
  readonly renderPlayer: (player: Player) => JSX.Element;
  readonly renderLoading: () => JSX.Element;
};

type State = {
  readonly players: readonly Player[];
  readonly page: number;
};

export const PlayersScroll = React.memo(function PlayersScroll({
  renderLoading,
  renderPlayer,
  ...extras
}: PlayersScrollProps): JSX.Element {
  const [state, setState] = React.useState<State>({
    players: [],
    page: 0,
  });
  const { data: maybeData } = usePlayers({
    page: state.page,
  });

  const nextData = maybeData?.data || [];
  const hasMore = (maybeData?.nextPage ?? false) !== false;

  const next = React.useCallback(
    () => setState((s) => ({ ...s, page: s.page + 1 })),
    []
  );

  React.useEffect(() => {
    if (!nextData.length) return;

    setState((s) => {
      const maybeNextPlayers = [...s.players, ...nextData];
      const nextPlayerIds = maybeNextPlayers.map(
        ({ address }: Player) => address
      );

      const nextPlayers = maybeNextPlayers.filter(
        ({ address }, i) => nextPlayerIds.indexOf(address) === i
      );

      return { ...s, players: nextPlayers };
    });
  }, [nextData]);

  return (
    <InfiniteScroll
      {...extras}
      dataLength={state.players.length}
      next={next}
      loader={renderLoading()}
      hasMore={hasMore}
      className="relative overflow-x-auto shadow-md rounded-b-lg bg-[#E4E4E7]"
    >
      {[...state.players, ...state.players].map((player: Player) => (
        <React.Fragment key={player.address} children={renderPlayer(player)} />
      ))}
    </InfiniteScroll>
  );
});
