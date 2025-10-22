import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showToast } from '../data/showToast';
import { removeCartAsync } from '../../store/thunks/cartThunks';
import { hideModal } from '../../store/slices/modalSlice';
import Button from '../../components/common/button/Button';
import './ModalPortal.scss';

function ModalPortal() {
  const dispatch = useAppDispatch();
  const { isOpen, title, message, confirmText, cancelText, actionType, handleConfirm } =
    useAppSelector((state) => state.modal);

  if (!isOpen) return null;

  const onConfirm = async () => {
    try {
      switch (actionType) {
        case 'REMOVE_CART':
          await dispatch(removeCartAsync()).unwrap();
          showToast.success('카트 삭제');
          break;
        case 'REMOVE_BILL':
        case 'REMOVE_ITEM':
        case 'REMOVE_WEDDING':
          if (handleConfirm) {
            handleConfirm();
          }
          break;
        default:
          break;
      }

      dispatch(hideModal());
    } catch (error: any) {
      console.error(`에러 발생 ${error}`);
      showToast.error(error.message || '작업 실패');
    }
  };

  const onCancel = () => {
    dispatch(hideModal());
  };

  const modalContent = (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
        </div>

        <div className="modal-body">
          <p>{message}</p>
        </div>

        <div className="modal-footer">
          <Button variant="cancel" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button variant="submit" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default ModalPortal;
