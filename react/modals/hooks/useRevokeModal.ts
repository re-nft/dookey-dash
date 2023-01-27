import { useModal } from "react-simple-modal-provider";

import { ID_MODAL_REVOKE } from "@/react/modals/consts";

export function useRevokeModal() {
  return useModal(ID_MODAL_REVOKE);
}
