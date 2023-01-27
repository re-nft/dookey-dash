import * as React from "react";
import {
  isDelegateCashResult,
  useDelegateCash,
  useGetContractLevelDelegations,
  useGetDelegatesForAll,
  useGetTokenLevelDelegations,
} from "use-delegatecash";

import { CONTRACT_ADDRESS_SEWER_PASS } from "@/react/consts";
import { Delegations } from "@/react/delegator";

// TODO: Note this only works on production ATM, update your .env.
export default function MyDelegations(): JSX.Element {
  // TODO: user address
  const vault = "0xbbc92cc8c8b73daaedfec30c01dad525f52b7c29";

  const delegateCash = useDelegateCash();

  const tokenLevelDelegations = useGetTokenLevelDelegations({ vault });
  const contractLevelDelegations = useGetContractLevelDelegations({ vault });
  const allDelegations = useGetDelegatesForAll({ vault });

  const { loading: tokenLevelLoading } = tokenLevelDelegations;
  const { loading: contractLevelLoading } = contractLevelDelegations;
  const { loading: allLoading } = allDelegations;

  const loading = tokenLevelLoading || contractLevelLoading || allLoading;

  const isResult =
    isDelegateCashResult(tokenLevelDelegations) &&
    isDelegateCashResult(contractLevelDelegations) &&
    isDelegateCashResult(allDelegations);

  const shouldRefreshView = React.useCallback(() => {
    console.log("idk how to do this yet");
  }, []);

  // TODO: how to refresh the view?

  const onRequestRevokeDelegate = React.useCallback(
    async (delegate: string) => {
      await delegateCash.revokeDelegate(delegate);
      shouldRefreshView();
    },
    [shouldRefreshView, delegateCash]
  );

  const onRequestRevokeAll = React.useCallback(async () => {
    await delegateCash.revokeAllDelegates();
    shouldRefreshView();
  }, [shouldRefreshView, delegateCash]);

  return (
    <div className="w-full flex flex-col h-full">
      {loading ? (
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
