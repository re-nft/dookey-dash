import { useModal } from "react-simple-modal-provider";

import {ID_MODAL_REVOKE_ALL} from "@/react/modals/consts";

export function useRevokeAllModal() {
  return useModal(ID_MODAL_REVOKE_ALL);
}
