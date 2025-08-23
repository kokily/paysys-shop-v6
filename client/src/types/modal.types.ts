export interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  actionType: string | null;
  handleConfirm?: () => void;
}
