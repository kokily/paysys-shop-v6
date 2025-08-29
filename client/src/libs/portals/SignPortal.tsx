import { useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showToast } from '../data/showToast';
import { addSignAsync } from '../../store/thunks/signThunks';
import { hideSignModal } from '../../store/slices/signSlice';
import { readWeddingAsync } from '../../store/thunks/weddingThunks';
import Button from '../../components/common/button/Button';
import SignCanvas from '../../components/common/canvas/SignCanvas';
import './SignPortal.scss';

function SignPortal() {
  const dispatch = useAppDispatch();
  const signState = useAppSelector((state) => state.sign);

  const onConfirm = useCallback(async () => {
    if (!signState.weddingId) {
      showToast.error('웨딩 ID가 없습니다.');
      return;
    }

    if (!signState.form.image) {
      showToast.error('서명을 먼저 해주세요');
      return;
    }

    // 실제 서명 Draw 여부
    const isDefaultCanvas = signState.form.image.includes(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
    );

    if (isDefaultCanvas || signState.form.image.length < 100) {
      showToast.error('서명을 먼저 해주세요.');
      return;
    }

    try {
      await dispatch(
        addSignAsync({
          weddingId: signState.weddingId,
          sex: signState.form.sex,
          image: signState.form.image,
        })
      ).unwrap();
      dispatch(hideSignModal());
      dispatch(readWeddingAsync(signState.weddingId));

      showToast.success(`${signState.signModal.title}이 등록되었습니다.`);
    } catch (error: any) {
      showToast.error(error.message || '서명 등록에 실패했습니다.');
    }
  }, [dispatch, signState.weddingId, signState.form.image, signState.form.sex, signState.signModal.title]);

  const onCancel = useCallback(() => {
    dispatch(hideSignModal());
  }, [dispatch]);

  if (!signState || !signState.signModal || !signState.form) {
    return null;
  }

  const { signModal, form, loading } = signState;

  if (!signModal.isOpen) {
    return null;
  }

  const modalContent = (
    <div className="sign-modal-overlay" onClick={onCancel}>
      <div className="sign-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="sign-modal-header">
          <h3>{signModal.title}</h3>
        </div>

        <div className="sign-modal-body">
          <SignCanvas width={320} height={240} initialImage={form.image || undefined} />
        </div>

        <div className="sign-modal-footer">
          <Button variant="cancel" onClick={onCancel} disabled={loading}>
            취소
          </Button>
          <Button variant="submit" onClick={onConfirm} disabled={loading}>
            {loading ? '처리중...' : '확인'}
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default SignPortal;
