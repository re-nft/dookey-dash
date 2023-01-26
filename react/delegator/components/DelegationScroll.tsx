import * as React from "react";
import InfiniteScroll, {
  Props as InfiniteScrollProps,
} from "react-infinite-scroll-component";
import {
  isDelegateCashResult,
  useGetTokenLevelDelegations,
} from "use-delegatecash";

export type DelegationScrollProps = Omit<
  InfiniteScrollProps,
  "next" | "hasMore" | "loader" | "dataLength" | "children"
> & {
  readonly vault: string | null | undefined;
  readonly contractAddress: string;
  readonly renderDelegatedTo: (to: string) => JSX.Element;
};

export const DelegationScroll = React.memo(function DelegationScroll({
  vault /* i.e. signer */,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  contractAddress,
  renderDelegatedTo,
  ...extras
}: DelegationScrollProps): JSX.Element {
  const state = useGetTokenLevelDelegations({ vault });

  const next = React.useCallback(() => undefined, []);
  const data = isDelegateCashResult(state) ? state.result : [];

  return (
    <InfiniteScroll
      {...extras}
      next={next}
      hasMore={false}
      loader={<></>}
      dataLength={data.length}
    >
      {data.map((d) => (
        <React.Fragment
          key={d.delegate}
          children={renderDelegatedTo(d.delegate)}
        />
      ))}
    </InfiniteScroll>
  );
});
