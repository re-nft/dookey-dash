import * as React from "react";
import { useModalProps } from "react-simple-modal-provider";

import { ID_MODAL_REVOKE } from "@/react/modals/consts";

export const ModalRevokeContent = React.memo(
  function ModalRevokeContent(): JSX.Element {
    const { nameOfRevokedToken } = useModalProps(ID_MODAL_REVOKE);
    return (
      <div>
        <span style={{ color: "white" }}>
          <span children="You have " />
          <span
            children="successfully revoked "
            style={{ fontWeight: "bold" }}
          />
          <span children={`${nameOfRevokedToken}`} />
        </span>
      </div>
    );
  }
);
