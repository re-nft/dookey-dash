import { useModal } from "react-simple-modal-provider";

import { ID_MODAL_WAITING_LIST } from "@/react/modals/consts";

export function useWaitingListModal() {
  return useModal(ID_MODAL_WAITING_LIST);
}
