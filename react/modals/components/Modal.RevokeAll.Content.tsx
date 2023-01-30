import * as React from "react";
import { useModalProps } from "react-simple-modal-provider";

import { ID_MODAL_REVOKE_ALL } from "@/react/modals/consts";

export const ModalRevokeAllContent = React.memo(
  function ModalRevokeContent(): JSX.Element {
    const {} = useModalProps(ID_MODAL_REVOKE_ALL);
    return (
      <>
        <span style={{ color: "white" }}>
          <span children="You have " />
          <span
            children="successfully revoked "
            style={{ fontWeight: "bold" }}
          />
          <span children="all tokens." />
        </span>
      </>
    );
  }
);
