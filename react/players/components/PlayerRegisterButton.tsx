import * as React from "react";
import { useAccount } from "wagmi";

import { useRegister } from "@/react/api";

export const PlayerRegisterButton = React.memo(
  function PlayerRegisterButton({onDidRegister}: {
    readonly onDidRegister?: () => void;
  }): JSX.Element {
    const { address, isConnected } = useAccount();



      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { register } = useRegister();

      const onPressRegister = React.useCallback(async () => {
          try {
              await register({});
              onDidRegister?.();
          } catch (e) {
              console.error(e);
          }
      }, [register, onDidRegister]);

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
