import * as React from "react";

export const ModalWaitingListContent = React.memo(
  function ModalWaitingListContent(): JSX.Element {
    return (
      <div>
        <span style={{ color: "white" }}>
          <span children="You are now on the waiting list!" />
          <span children="-" />
          <span>
            <span children="Share this for a better chance to get a " />
            <span children="Sewer Pass" style={{ fontWeight: "bold" }} />
          </span>
        </span>
      </div>
    );
  }
);
