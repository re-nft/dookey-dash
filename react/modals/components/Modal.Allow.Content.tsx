import * as React from "react";
import { useModalProps } from "react-simple-modal-provider";

import { TwitterShare } from "@/react/components/twitter-share";
import { ID_MODAL_ALLOW } from "@/react/modals/consts";

import * as Styles from "./Modal.styles";

export const ModalAllowContent = React.memo(
  function ModalAllowContent(): JSX.Element {
    const { address } = useModalProps(ID_MODAL_ALLOW);

    // TODO: implement this logic
    const shortAddress = `${address}`;

    return (
      <Styles.Container>
        <Styles.Title>Allowed play!</Styles.Title>

        <Styles.P>
          You have{" "}
          <strong className="text-dookey-green">successfully allowed</strong>{" "}
          user <strong className="text-dookey-green">{shortAddress}</strong> to
          play!
        </Styles.P>

        {/* TODO: config */}
        <TwitterShare
          textToShare={`I just delegated a Sewer Pass to ${shortAddress}! 💪 #dookeydash @delegatecash @renftlabs`}
          urlToShare={window.location.origin}
        />
      </Styles.Container>
    );
  }
);
