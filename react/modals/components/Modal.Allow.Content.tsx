import * as React from "react";
import { useModalProps } from "react-simple-modal-provider";

import { TwitterShare } from "@/react/components/twitter-share";
import { ID_MODAL_ALLOW } from "@/react/modals/consts";

export const ModalAllowContent = React.memo(
  function ModalAllowContent(): JSX.Element {
    const { address } = useModalProps(ID_MODAL_ALLOW);

    // TODO: implement this logic
    const shortAddress = `${address}`;

    return (
      <>
        <span style={{ color: "white" }}>
          <span children="You have " />
          <span
            children="successfully allowed "
            style={{ fontWeight: "bold" }}
          />
          <span children={`user ${shortAddress} to play! `} />
        </span>
        <div style={{ height: "10px" }} />
        {/* TODO: config */}
        <TwitterShare
          textToShare={`I just delegated a Sewer Pass to ${shortAddress}! 💪 #dookeydash @delegatecash @renftlabs`}
          urlToShare={`${window.location.origin}/${address}`}
        />
      </>
    );
  }
);
