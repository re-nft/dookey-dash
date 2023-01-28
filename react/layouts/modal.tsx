import * as React from "react";

export const ModalLayout = React.memo(function ModalLayout({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
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
