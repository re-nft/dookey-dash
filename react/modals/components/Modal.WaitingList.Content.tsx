import * as React from "react";

import { TwitterShare } from "@/react/components/twitter-share";

export const ModalWaitingListContent = React.memo(
  function ModalWaitingListContent(): JSX.Element {
    return (
      <>
        <div>
          <span
            children="You are now on the waiting list!"
            style={{ color: "white" }}
          />
        </div>
        <div>
          <span children="-" style={{ color: "white" }} />
        </div>
        <span style={{ color: "white" }}>
          <span>
            <span children="Share this for a better chance to get a " />
            <span children="Sewer Pass" style={{ fontWeight: "bold" }} />
          </span>
        </span>
        <div style={{ height: "10px" }} />
        <TwitterShare />
      </>
    );
  }
);
