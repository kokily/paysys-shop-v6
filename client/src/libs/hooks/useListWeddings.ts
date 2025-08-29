import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useCallback, useEffect } from 'react';
import { clearScrollY, clearWeddings, setScrollY } from '../../store/slices/weddingSlice';
import { listWeddingsAsync, loadMoreWeddingsAsync } from '../../store/thunks/weddingThunks';
import { useObserver } from './useObserver';

export function useListWeddings() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { weddings, loading, error, cursor, hasMore, scrollY } = useAppSelector((state) => state.wedding);

  const fetchWeddings = useCallback(() => {
    dispatch(clearWeddings());
    dispatch(clearScrollY());
    dispatch(listWeddingsAsync({}));
  }, [dispatch]);

  const loadMoreWeddings = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(
        loadMoreWeddingsAsync({
          cursor: cursor || undefined,
        })
      );
    }
  }, [dispatch, hasMore, cursor, loading]);

  const onReadWedding = useCallback(
    (id: string) => {
      dispatch(setScrollY(window.scrollY));
      navigate(`/wedding/${id}`);
    },
    [navigate]
  );

  const onAddWeddingPage = useCallback(() => {
    navigate('/wedding/add');
  }, [navigate]);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && loadMoreWeddings();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (weddings.length === 0) {
      dispatch(clearWeddings());
      fetchWeddings();
    }
  }, []);

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return {
    weddings,
    loading,
    error,
    onReadWedding,
    onAddWeddingPage,
    setTarget,
  };
}
