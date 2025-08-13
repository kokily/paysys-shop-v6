import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearBills, clearScrollY, listBillsAsync, loadMoreBillsAsync, setHall, setScrollY, setSearch, setUserId } from "@/store/slices/billSlice";
import useObserver from "./useObserver";

export function useBills() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    bills,
    loading,
    error,
    search,
    hall,
    user_id,
    hasMore,
    cursor,
    scrollY,
  } = useAppSelector((state) => state.bill);

  const fetchBills = useCallback(() => {
    dispatch(clearBills());
    dispatch(clearScrollY());
    dispatch(listBillsAsync({ title: search, hall, user_id }));
  }, [dispatch, search, hall, user_id ])

  const loadMoreBills = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(loadMoreBillsAsync({
        cursor: cursor || undefined,
        title: search,
        hall,
        user_id
      }));
    }
  }, [dispatch, hasMore, loading, cursor, search, hall, user_id ]);

  const onReadFront = useCallback((id: string) => {
    dispatch(setScrollY(window.scrollY));
    navigate(`/front/${id}`);
  }, [navigate]);

  const onChange = useCallback((searchTerm: string) => {
    dispatch(setSearch(searchTerm));
  }, [dispatch]);

  const onHallSearch = useCallback((hallName: string) => {
    dispatch(clearBills());
    dispatch(clearScrollY());
    dispatch(setHall(hallName));
  }, [dispatch]);

  const onUserSearch = useCallback((userId: string) => {
    dispatch(clearBills());
    dispatch(clearScrollY());
    dispatch(setUserId(userId));
  }, [dispatch]);

  const onSearch = useCallback(() => {
    dispatch(clearBills());
    dispatch(clearScrollY());
    fetchBills();
  }, [fetchBills]);

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

  // 스크롤 위치 복원
  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return {
    bills,
    loading,
    error,
    search,
    hasMore,
    onChange,
    onSearch,
    onReadFront,
    onHallSearch,
    onUserSearch,
    setTarget
  };
};