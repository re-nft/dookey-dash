import * as React from "react";
import { useModalProps } from "react-simple-modal-provider";

import { ID_MODAL_REVOKE } from "@/react/modals/consts";

import * as Styles from "./Modal.styles";

export const ModalRevokeContent = React.memo(
  function ModalRevokeContent(): JSX.Element {
    const { nameOfRevokedToken } = useModalProps(ID_MODAL_REVOKE);
    return (
      <Styles.Container>
        <Styles.Title>Successfully revoked!</Styles.Title>

        <Styles.P>
          You have successfully revoked{" "}
          <strong className="text-dookey-green">${nameOfRevokedToken}</strong>.
        </Styles.P>
      </Styles.Container>
    );
  }
);
