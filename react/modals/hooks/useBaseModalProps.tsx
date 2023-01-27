import * as React from "react";
import { modalAnimation, useModalState } from "react-simple-modal-provider";

import { ModalLayout } from "@/react/layouts/modal";

// HACK: I know this architecture is weird, I really do, but we are forced to
//       write this way (and not use a component). I believe the `<Modal>` is
//       using nearest-child introspection, which prevents us from declaring
//       a base class.
export function useBaseModalProps({
  id,
  children: consumer,
  renderModalContent,
}: {
  readonly id: string;
  readonly children: React.ReactNode;
  readonly renderModalContent: () => JSX.Element;
}) {
  const [isOpen, setOpen] = useModalState();
  return {
    animation: modalAnimation.scaleUp,
    id,
    consumer,
    children: <ModalLayout children={renderModalContent()} />,
    isOpen,
    setOpen,
    overlayColor: "rgba(0,0,0,0)",
  } as const;
}
