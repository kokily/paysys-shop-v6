import type { WeddingType } from '../../types/wedding.types';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { showRemoveSignModal, showSignModal } from '../../store/slices/signSlice';

interface Props {
  wedding: WeddingType;
}

export function useWeddingPane({ wedding }: Props) {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const onHusbandSignModal = useCallback(() => {
    if (id) {
      dispatch(showSignModal({ type: 'husband', weddingId: id }));
    }
  }, [id, dispatch]);

  const onBrideSignModal = useCallback(() => {
    if (id) {
      dispatch(showSignModal({ type: 'bride', weddingId: id }));
    }
  }, [id, dispatch]);

  const onRemoveHusbandSign = useCallback(() => {
    if (id && wedding.husband_image) {
      dispatch(showRemoveSignModal({ type: 'husband', weddingId: id }));
    }
  }, [id, dispatch, wedding.husband_image]);

  const onRemoveBrideSign = useCallback(() => {
    if (id && wedding.bride_image) {
      dispatch(showRemoveSignModal({ type: 'bride', weddingId: id }));
    }
  }, [id, dispatch, wedding.bride_image]);

  return {
    onHusbandSignModal,
    onBrideSignModal,
    onRemoveHusbandSign,
    onRemoveBrideSign,
  };
}
