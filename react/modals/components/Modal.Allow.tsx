import * as React from "react";
import Modal from "react-simple-modal-provider";

import { ID_MODAL_ALLOW } from "@/react/modals/consts";

import { useBaseModalProps } from "../hooks";
import { ModalAllowContent } from "./Modal.Allow.Content";

export function ModalAllow({ children }: React.PropsWithChildren): JSX.Element {
  return (
    <Modal
      {...useBaseModalProps({
        children,
        id: ID_MODAL_ALLOW,
        renderModalContent: () => <ModalAllowContent />,
      })}
    />
  );
}
