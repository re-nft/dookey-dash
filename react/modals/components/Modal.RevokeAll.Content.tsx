import * as React from "react";

export const ModalRevokeAllContent = React.memo(
  function ModalRevokeContent(): JSX.Element {
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
