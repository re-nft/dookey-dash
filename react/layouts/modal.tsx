import * as React from "react";

export const ModalLayout = React.memo(function ModalLayout({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <div
      style={{
        backgroundColor: "#009F53",
        borderRadius: "20px",
        overflow: "hidden",
        padding: "30px",
      }}
    >
      {children}
    </div>
  );
});
