import Link from "next/link";
import * as React from "react";
import { useAccount } from "wagmi";

import { useIsRegistered } from "@/react/api";

export const PlayerRegisterButton = React.memo(
  function PlayerRegisterButton(): JSX.Element {
    const { address } = useAccount();

    const { loading: loadingIsRegistered, isRegistered } = useIsRegistered({
      address,
    });

    return (
      <Link
        href="/register"
        style={{
          color: loadingIsRegistered ? "grey" : isRegistered ? "red" : "green",
        }}
      >
        Tap here to register.
      </Link>
    );
  }
);
