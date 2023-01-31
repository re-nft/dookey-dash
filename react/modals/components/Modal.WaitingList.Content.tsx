import * as React from "react";
import { useAccount } from "wagmi";

import { TwitterShare } from "@/react/components/twitter-share";

import * as Styles from "./Modal.styles";

export const ModalWaitingListContent = React.memo(
  function ModalWaitingListContent(): JSX.Element {
    const { address } = useAccount();
    return (
      <Styles.Container>
        <Styles.Title>You are now on the waiting list!</Styles.Title>

        <Styles.P>
          Share this for a better chance to get a{" "}
          <strong className="text-dookey-green">Sewer Pass</strong>
        </Styles.P>

        {/* TODO: config */}
        <TwitterShare
          textToShare="C'mon, let me play #dookeydash! @renftlabs @delegatecash @BoredApeYC"
          urlToShare={`${window.location.origin}/${address}`}
        />
      </Styles.Container>
    );
  }
);
