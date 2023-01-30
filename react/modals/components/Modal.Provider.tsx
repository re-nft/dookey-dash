import * as React from "react";
import { ModalProvider as DefaultModalProvider } from "react-simple-modal-provider";

import { ModalAllow } from "./Modal.Allow";
import { ModalRevoke } from "./Modal.Revoke";
import { ModalWaitingList } from "./Modal.WaitingList";

const value = [ModalWaitingList, ModalRevoke, ModalAllow];

export function ModalProvider({
  children,
}: React.PropsWithChildren): JSX.Element {
  return <DefaultModalProvider value={value} children={children} />;
}
