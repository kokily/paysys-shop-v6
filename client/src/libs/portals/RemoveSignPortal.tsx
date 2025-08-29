import { useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showToast } from '../data/showToast';
import { readWeddingAsync } from '../../store/thunks/weddingThunks';
import { removeSignAsync } from '../../store/thunks/signThunks';
import { hideRemoveSignModal } from '../../store/slices/signSlice';
import Button from '../../components/common/button/Button';
import './RemoveSignPortal.scss';

function RemoveSignPortal() {
  const dispatch = useAppDispatch();
  const { removeModal, weddingId } = useAppSelector((state) => state.sign);

  const onConfirm = useCallback(async () => {
    if (!weddingId || !removeModal.type) {
      showToast.error('웨딩 ID가 없습니다.');
      return;
    }

    try {
      await dispatch(removeSignAsync({ weddingId, sex: removeModal.type })).unwrap();
      dispatch(hideRemoveSignModal());

      try {
        await dispatch(readWeddingAsync(weddingId));
      } catch (error: any) {
        console.error(error);
        window.location.reload();
        return;
      }

      showToast.success(`${removeModal.type === 'husband' ? '신랑' : '신부'} 서명 삭제`);
    } catch (error: any) {
      showToast.error(error.message || '서명 삭제 실패');
    }
  }, [dispatch, weddingId, removeModal.type]);

  const onCancel = useCallback(() => {
    dispatch(hideRemoveSignModal());
  }, [dispatch]);

  if (!removeModal.isOpen) {
    return null;
  }

  const modalContent = (
    <div className="remove-sign-modal-overlay" onClick={onCancel}>
      <div className="remove-sign-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="remove-sign-modal-header">
          <h3>서명 삭제</h3>
        </div>

        <div className="remove-sign-modal-body">
          <p>{removeModal.type === 'husband' ? '신랑' : '신부'}님 서명을 삭제하시겠습니까?</p>
        </div>

        <div className="remove-sign-modal-footer">
          <Button variant="cancel" onClick={onCancel}>
            취소
          </Button>
          <Button variant="submit" onClick={onConfirm}>
            확인
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default RemoveSignPortal;
