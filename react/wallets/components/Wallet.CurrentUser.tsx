import * as React from "react";
import { TwitterShareButton } from 'react-twitter-embed';
import {
  isDelegateCashResult,
  useDelegateCash,
  useGetContractLevelDelegations,
  useGetDelegatesForAll,
  useGetTokenLevelDelegations,
} from "use-delegatecash";
import { useAccount } from "wagmi";

import {useIsRegistered} from "@/react/api";
import { CONTRACT_ADDRESS_SEWER_PASS } from "@/react/consts";
import { Delegations } from "@/react/delegators";

// TODO: Note this only works on production ATM, update your .env.
export function WalletCurrentUser(): JSX.Element {
  const { address: vault } = useAccount();
  const {
    loading: loadingIsRegistered,
    isRegistered,
  } = useIsRegistered({address: vault});

  const isRegisteredPlayer = !loadingIsRegistered && isRegistered;

  const delegateCash = useDelegateCash();

  const tokenLevelDelegations = useGetTokenLevelDelegations({ vault });
  const contractLevelDelegations = useGetContractLevelDelegations({ vault });
  const allDelegations = useGetDelegatesForAll({ vault });

  const { loading: tokenLevelLoading, refetch: refetchTokenLevel } =
    tokenLevelDelegations;
  const { loading: contractLevelLoading, refetch: refetchContractLevel } =
    contractLevelDelegations;
  const { loading: allLoading, refetch: refetchAll } = allDelegations;

  const loading = tokenLevelLoading || contractLevelLoading || allLoading;

  const refetch = React.useCallback(
    () =>
      Promise.all([refetchAll(), refetchContractLevel(), refetchTokenLevel()]),
    [refetchAll, refetchContractLevel, refetchTokenLevel]
  );

  const isResult =
    isDelegateCashResult(tokenLevelDelegations) &&
    isDelegateCashResult(contractLevelDelegations) &&
    isDelegateCashResult(allDelegations);


  // TODO: how to refresh the view?

  const onRequestRevokeDelegate = React.useCallback(
    async (delegate: string) => {
      await delegateCash.revokeDelegate(delegate);
      await refetch();
    },
    [delegateCash, refetch]
  );

  const onRequestRevokeAll = React.useCallback(async () => {
    await delegateCash.revokeAllDelegates();
    await refetch();
  }, [delegateCash, refetch]);

  return (
    <div className="w-full flex flex-col h-full">
      {isRegisteredPlayer && (
        <TwitterShareButton
          url={window.location.href}
          options={{
            size: 'large',
            text: `I want to play #dookeydash! @renftlabs @yugalabs @delegatecash`,
          }}
        />
      )}
      {loading || !vault ? (
        <span>loading</span>
      ) : isResult ? (
        <Delegations
          onRequestRevokeAll={onRequestRevokeAll}
          onRequestRevokeDelegate={onRequestRevokeDelegate}
          filterByContractAddress={CONTRACT_ADDRESS_SEWER_PASS}
          vault={vault}
          tokenLevelDelegations={tokenLevelDelegations}
          allDelegations={allDelegations}
          contractLevelDelegations={contractLevelDelegations}
        />
      ) : (
        <span>error</span>
      )}
    </div>
  );
}
