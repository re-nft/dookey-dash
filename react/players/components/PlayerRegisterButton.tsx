import { useRouter } from "next/router";
import * as React from "react";
import { useAccount } from "wagmi";

import { useIsRegistered, useRegister } from "@/react/api";

export const PlayerRegisterButton = React.memo(
  function PlayerRegisterButton(): JSX.Element {
    const { address, isConnected } = useAccount();

    const { loading: loadingIsRegistered, isRegistered } = useIsRegistered({
      address,
    });

    console.log("loadingIsRegistered", loadingIsRegistered);
    console.log("isRegistered", isRegistered);
      const router = useRouter();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { register } = useRegister();

      const onPressRegister = React.useCallback(async () => {
          try {
              await register({});
          } catch (e) {
              console.error(e);
          }
      }, [register, router]);

      console.log(isConnected);

      if (!isConnected) {
        return (
          <div className="flex flex-wrap flex-col content-center text-center">
              <p className="mb-2">Connect a wallet first!</p>
          </div>
        );
      }

      return (
          <div className="max-w-md mx-auto">
              <p className="flex justify-center">
                  <button
                      className="bg-black px-4 py-2 rounded text-white"
                      onClick={onPressRegister}
                  >
                      Register
                  </button>
              </p>
          </div>
      );
  }
);
