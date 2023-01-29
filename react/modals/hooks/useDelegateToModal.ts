import { useModal } from "react-simple-modal-provider";

import {ID_MODAL_DELEGATE_TO} from "@/react/modals/consts";

export function useDelegateToModal() {
  return useModal(ID_MODAL_DELEGATE_TO);
}
