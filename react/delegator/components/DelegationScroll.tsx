import * as React from 'react';
import {
    useGetDelegatesForContract,
    isDelegateCashResult, useGetDelegatesForAll, useGetTokenLevelDelegations,
} from 'use-delegatecash';
import InfiniteScroll, {Props as InfiniteScrollProps} from "react-infinite-scroll-component";

export type DelegationScrollProps = Omit<
  InfiniteScrollProps,
  "next" | "hasMore" | "loader" | "dataLength" | "children"
> & {
  readonly vault: string | null | undefined;
  readonly contractAddress: string;
  readonly renderDelegatedTo: (to: string) => JSX.Element;
};

export const DelegationScroll = React.memo(
  function DelegationScroll({
    vault /* i.e. signer */,
    contractAddress,
    renderDelegatedTo,
    ...extras
  }: DelegationScrollProps): JSX.Element {

    const state = useGetTokenLevelDelegations({vault})

    const next = React.useCallback(() => undefined, []);
    const data =  isDelegateCashResult(state) ? state.result : [];

    return (
      <InfiniteScroll {...extras} next={next} hasMore={false} loader={<></>} dataLength={data.length}>
        {data.map((d) => (
          <React.Fragment key={d.delegate} children={renderDelegatedTo(d.delegate)} />
        ))}
      </InfiniteScroll>
    );
  },
);
