import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hideModal } from '@/store/slices/modalSlice';
import Button from './Button';
import './Modal.scss';
import { showToast } from '@/utils/toast';
import { removeCartAsync } from '@/store/slices/cartSlice';

function ModalPortal() {
  const dispatch = useAppDispatch();
  const {
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    actionType,
  } = useAppSelector((state) => state.modal);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      switch (actionType) {
        case 'REMOVE_CART':
          await dispatch(removeCartAsync()).unwrap();
          showToast.success('카트 삭제');
          break;
        default:
          break;
      }
    } catch (error: any) {
      showToast.error(error.message || '작업 실패');
    }
  };

  const handleCancel = () => {
    dispatch(hideModal());
  };

  const modalContent = (
    <div className='modal-overlay' onClick={handleCancel}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h3>{title}</h3>
        </div>

        <div className='modal-body'>
          <p>{message}</p>
        </div>

        <div className='modal-footer'>
          <Button variant='cancel' onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button variant='submit' onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );   

  return createPortal(modalContent, document.body);
}

export default ModalPortal;