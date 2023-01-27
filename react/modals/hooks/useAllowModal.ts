import { useModal } from "react-simple-modal-provider";

import { ID_MODAL_ALLOW } from "@/react/modals/consts";

export function useAllowModal() {
  return useModal(ID_MODAL_ALLOW);
}
