import * as React from "react";
import { useModalProps } from "react-simple-modal-provider";

import { TwitterShare } from "@/react/components/twitter-share";
import { ID_MODAL_ALLOW } from "@/react/modals/consts";

export const ModalAllowContent = React.memo(
  function ModalAllowContent(): JSX.Element {
    const { address } = useModalProps(ID_MODAL_ALLOW);
    return (
      <>
        <span style={{ color: "white" }}>
          <span children="You have " />
          <span
            children="successfully allowed "
            style={{ fontWeight: "bold" }}
          />
          <span children={`user 0x${address} to play! `} />
        </span>
        <div style={{ height: "10px" }} />
        <TwitterShare />
      </>
    );
  }
);
