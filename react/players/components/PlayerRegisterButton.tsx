import { useRouter } from "next/router";
import * as React from "react";
import { useAccount } from "wagmi";

import { useIsRegistered, useRegister } from "@/react/api";

export const PlayerRegisterButton = React.memo(function PlayerRegisterButton({
  onDidRegister,
}: {
  readonly onDidRegister?: () => void;
}): JSX.Element {
  const { address, isConnected } = useAccount();

  const { loading: loadingIsRegistered, isRegistered } = useIsRegistered({
    address,
  });

  console.log("loadingIsRegistered", loadingIsRegistered);
  console.log("isRegistered", isRegistered);
  const router = useRouter();
  console.log("router", router);

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
      <div className="p-5 w-full m-3 bg-[#A855F7] shadow-md rounded text-white uppercase md:w-auto md:px-4 md:py-2">
        <p className="mb-2">Connect a wallet first!</p>
      </div>
    );
  }

  return (
    <button
      className="p-5 w-full m-3 bg-[#A855F7] shadow-md rounded text-white uppercase md:w-auto md:px-4 md:py-2"
      onClick={onPressRegister}
    >
      I Want to play
    </button>
  );
});
