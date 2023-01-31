import * as React from "react";
import InfiniteScroll, {
  Props as InfiniteScrollProps,
} from "react-infinite-scroll-component";

import { PlayerWithDookeyStats } from "@/common/stats.utils";
import { Player, usePlayers } from "@/react/api";
import Link from "next/link";

export type PlayersScrollProps = Omit<
  InfiniteScrollProps,
  "next" | "hasMore" | "loader" | "dataLength" | "children"
> & {
  readonly renderPlayer: (player: PlayerWithDookeyStats) => JSX.Element;
  readonly renderLoading: () => JSX.Element;
};

type State = {
  readonly players: readonly PlayerWithDookeyStats[];
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
      className="relative overflow-y-auto"
    >
      {[...state.players].map((player: PlayerWithDookeyStats) => (
        <Link key={player.address} href={`/${player.address}`}>
          {renderPlayer(player)}
        </Link>
      ))}
    </InfiniteScroll>
  );
});
