import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import type { NextPage } from "next";
import * as React from "react";
import { useAccount, useSignMessage } from "wagmi";

import {
  rawMessageToSignedMessage,
  verifySignature,
} from "@/common/signature.utils";

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const session = await unstable_getServerSession(
//     ctx.req,
//     ctx.res,
//     authOptions
//   );

//   console.log(session);

//   return {
//     props: { session },
//   };
// };

function usePlayers({
  page = 0,
  limit = 10,
}: {
  readonly page?: number;
  readonly limit?: number;
} = {}) {
  return useQuery(
    ["usePlayers", page, limit],
    React.useCallback(
      () =>
        fetch(`/api/player/all?page=${page}&limit=${limit}`, {
          method: "get",
        }).then((response) => response.json()),
      [page, limit]
    )
  );
}

function usePlayer({
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

function useRegister() {
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

      console.log("signature is ok");

      return fetch("/api/player/register", {
        method: "POST",
        body: JSON.stringify(registrationObj),
      });
    },
    [maybeAddress, signMessageAsync]
  );

  return { register };
}

const Home: NextPage = () => {
  const { data: players } = usePlayers();

  const {
    data: { result: player },
  } = usePlayer({
    address: "0x22eA0EAad94F535d24062E8b79DB0587f70B9B1b".toLowerCase(),
  });

  const { register } = useRegister();

  console.log(players, player);

  return (
    <div className="w-full flex flex-col h-full">
      <div>
        <h1 className="text-4xl my-4 lg:my-6 text-center">
          Available Server Passes
        </h1>
        <h2 onClick={React.useCallback(() => register({}), [])}>
          Tap here to register.
        </h2>
      </div>
    </div>
  );
};

export default Home;
