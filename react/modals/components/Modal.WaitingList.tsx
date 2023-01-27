import * as React from "react";
import Modal from "react-simple-modal-provider";

import { ID_MODAL_WAITING_LIST } from "@/react/modals/consts";

import { useBaseModalProps } from "../hooks";
import { ModalWaitingListContent } from "./Modal.WaitingList.Content";

export function ModalWaitingList({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <Modal
      {...useBaseModalProps({
        children,
        id: ID_MODAL_WAITING_LIST,
        renderModalContent: () => <ModalWaitingListContent />,
      })}
    />
  );
}
