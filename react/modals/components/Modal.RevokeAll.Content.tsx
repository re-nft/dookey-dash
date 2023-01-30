import * as React from "react";

import * as Styles from "./Modal.styles";

export const ModalRevokeAllContent = React.memo(
  function ModalRevokeContent(): JSX.Element {
    return (
      <Styles.Container>
        <Styles.Title>Succesfully revoked!</Styles.Title>
        <Styles.P>
          You have succesfully revoked{" "}
          <strong className="text-dookey-green">all tokens</strong>.
        </Styles.P>
      </Styles.Container>
    );
  }
);
