import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useObserver } from './useObserver';
import { listBillsAsync, loadMoreBillsAsync } from '../../store/thunks/billThunks';
import {
  clearBills,
  clearScrollY,
  setHall,
  setScrollY,
  setTitle,
  setUserId,
} from '../../store/slices/billSlice';

export function useListBills() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { bills, loading, error, title, hall, user_id, hasMore, cursor, scrollY } = useAppSelector(
    (state) => state.bill
  );

  const fetchBills = useCallback(() => {
    dispatch(clearBills());
    dispatch(clearScrollY());
    dispatch(listBillsAsync({ title, hall, user_id }));
  }, [dispatch, title, hall, user_id]);

  const loadMoreBills = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(
        loadMoreBillsAsync({
          cursor: cursor || undefined,
          title,
          hall,
          user_id,
        })
      );
    }
  }, [dispatch, title, hall, user_id, hasMore, cursor, loading]);

  const onReadFront = useCallback(
    (id: string) => {
      dispatch(setScrollY(window.scrollY));
      navigate(`/front/${id}`);
    },
    [navigate]
  );

  const onChange = useCallback(
    (searchTerm: string) => {
      dispatch(setTitle(searchTerm));
    },
    [dispatch]
  );

  const onSearchTitle = useCallback(() => {
    dispatch(clearBills());
    dispatch(clearScrollY());
    fetchBills();
  }, [fetchBills]);

  const onHallSearch = useCallback(
    (hallName: string) => {
      dispatch(clearBills());
      dispatch(clearScrollY());
      dispatch(setHall(hallName));
    },
    [dispatch]
  );

  const onUserSearch = useCallback(
    (userId: string) => {
      dispatch(clearBills());
      dispatch(clearScrollY());
      dispatch(setUserId(userId));
    },
    [dispatch]
  );

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && loadMoreBills();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (bills.length === 0) {
      dispatch(clearBills());
      fetchBills();
    }
  }, []);

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return {
    bills,
    loading,
    error,
    title,
    onChange,
    onSearchTitle,
    onHallSearch,
    onUserSearch,
    onReadFront,
    setTarget,
  };
}
