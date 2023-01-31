import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ethers } from "ethers";
import React from "react";
import {useDeepCompareMemo} from "use-deep-compare";
import {
    isDelegateCashError,
    isDelegateCashResult,
    useGetContractLevelDelegations,
    useGetDelegatesForAll, useGetDelegationsByDelegate,
    useGetTokenLevelDelegations,
} from "use-delegatecash";
import { useAccount, useSignMessage } from "wagmi";

import { compareAddresses } from "@/common/address.utils";
import {
  rawMessageToSignedMessage,
  verifySignature,
} from "@/common/signature.utils";
import { PlayerWithDookeyStats } from "@/common/stats.utils";
import {CONTRACT_ADDRESS_SEWER_PASS} from "@/config";

export type Player = {
  readonly address: string;
  readonly message: string;
};

// TODO: Share with api.
type PaginatedResult<T> = {
  readonly data: readonly T[];
  readonly nextPage: number | false;
};

export function usePlayers({
  page = 0,
  limit = 10,
  keepPreviousData = false,
}: {
  readonly page?: number;
  readonly limit?: number;
  readonly keepPreviousData?: boolean;
} = {}) {
  return useQuery<PaginatedResult<PlayerWithDookeyStats>>(
    ["usePlayers", page, limit],
    React.useCallback(
      () =>
        fetch(`/api/player/all?page=${page}&limit=${limit}`, {
          method: "get",
        }).then((response) => response.json()),
      [page, limit]
    ),
    {
      keepPreviousData,
    }
  );
}

export function usePlayer({
  address: maybeAddress,
}: {
  readonly address: string | null | undefined;
}) {
  return useQuery(
    ["usePlayer", maybeAddress],
    React.useCallback(
      () =>
        fetch(
          `/api/player/find/${
            ethers.utils.isAddress(maybeAddress || "")
              ? ethers.utils.getAddress(maybeAddress!)
              : ""
          }`,
          {
            method: "get",
          }
        ).then((response) => response.json()),
      [maybeAddress]
    ),
    {
      enabled: typeof maybeAddress === "string" && Boolean(maybeAddress.length),
    }
  );
}

type RegistrationFormProps = Record<string, unknown>;

export function useRegister() {
  const { address: maybeAddress } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const register = React.useCallback(
    async (props: RegistrationFormProps) => {
      if (typeof maybeAddress !== "string" || !maybeAddress.length)
        throw new Error(
          `Expected non-empty string address, encountered "${String(
            maybeAddress
          )}".`
        );

      const address = ethers.utils.getAddress(maybeAddress);
      const rawMessage = JSON.stringify(props);

      const messageToSign = rawMessageToSignedMessage(rawMessage);
      const signature = await signMessageAsync({ message: messageToSign });

      const registrationObj = {
        address,
        message: rawMessage,
        signature,
      };

      const signatureIsOkay = verifySignature({
        signerAddress: registrationObj.address,
        rawMessage: registrationObj.message,
        signature: registrationObj.signature,
      });

      if (!signatureIsOkay) throw new Error("Generated an invalid signature!");

      return axios({
        url: "/api/player/register",
        method: "POST",
        data: registrationObj,
      });
    },
    [maybeAddress, signMessageAsync]
  );

  return { register };
}

export function useIsRegistered({
  address,
}: {
  readonly address: string | null | undefined;
}) {
  const { isLoading, data, refetch } = usePlayer({ address });

  const maybeDataAddress = data?.result?.address;

  const isRegistered =
    typeof maybeDataAddress === "string" &&
    ethers.utils.isAddress(maybeDataAddress) &&
    compareAddresses(address, maybeDataAddress);

  return { loading: isLoading, isRegistered, refetch };
}

// Returns a list of the addresses that have been delegated to for the active wallet.
export function useDelegatedAddresses() {
  const { address: vault } = useAccount();

  const tokenLevelDelegations = useGetTokenLevelDelegations({ vault });
  const contractLevelDelegations = useGetContractLevelDelegations({ vault });
  const delegatesForAll = useGetDelegatesForAll({ vault });

  const {
    loading: loadingTokenLevelDelegations,
    refetch: refetchTokenLevelDelegations,
  } = tokenLevelDelegations;

  const {
    loading: loadingContractLevelDelegations,
    refetch: refetchContractLevelDelegations,
  } = contractLevelDelegations;

  const { loading: loadingDelegatesForAll, refetch: refetchDelegatesForAll } =
    delegatesForAll;

  const loading =
    loadingTokenLevelDelegations ||
    loadingContractLevelDelegations ||
    loadingDelegatesForAll;

  const refetch = React.useCallback(
    () =>
      Promise.all([
        refetchTokenLevelDelegations(),
        refetchContractLevelDelegations(),
        refetchDelegatesForAll(),
      ]),
    [
      refetchTokenLevelDelegations,
      refetchContractLevelDelegations,
      refetchDelegatesForAll,
    ]
  );

  const addresses = React.useMemo<readonly string[]>(() => {
    if (loading) return [];

    if (
      !isDelegateCashResult(tokenLevelDelegations) ||
      !isDelegateCashResult(contractLevelDelegations) ||
      !isDelegateCashResult(delegatesForAll)
    )
      return [];

    return [
      ...new Set([
        ...tokenLevelDelegations.result.map((e) => e.delegate),
        ...contractLevelDelegations.result.map((e) => e.delegate),
        ...delegatesForAll.result,
      ]),
    ];
  }, [loading]);

  return { loading, addresses, refetch, tokenLevelDelegations };
}

export function useSewerPasses({
  address: maybeAddress,
}: {
  readonly address: string | null | undefined;
}) {
  return useQuery(
    ["useSewerPasses", maybeAddress],
    React.useCallback(
      () =>
        fetch(
          `/api/player/tokens?address=${
            ethers.utils.isAddress(maybeAddress || "")
              ? ethers.utils.getAddress(maybeAddress!)
              : ""
          }`,
          {
            method: "get",
          }
        ).then((response) => response.json()),
      [maybeAddress]
    ),
    {
      enabled: typeof maybeAddress === "string" && Boolean(maybeAddress.length),
    }
  );
}

export function useSewerPassesDelegatedToAddress({
  address,
}: {
  readonly address: string | null | undefined;
}) {
  const delegationsByDelegate = useGetDelegationsByDelegate({
    delegate: address,
  });

  const passesDelegatedToMe = isDelegateCashResult(delegationsByDelegate)
    ? delegationsByDelegate.result
    : [];

  const sewerPassesDelegatedToMe = passesDelegatedToMe.filter(
    ({contract}) => compareAddresses(contract, CONTRACT_ADDRESS_SEWER_PASS)
  );

  const error  = isDelegateCashError(delegationsByDelegate) ? delegationsByDelegate.error : undefined;

  return {
    sewerPassesDelegatedToMe: useDeepCompareMemo(() => sewerPassesDelegatedToMe, [sewerPassesDelegatedToMe]),
    loading: delegationsByDelegate.loading,
    error,
  };
}
