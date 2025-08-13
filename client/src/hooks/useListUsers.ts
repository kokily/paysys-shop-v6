import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearScrollY, clearUsers, listUsersAsync, loadMoreUsersAsync, setScrollY, setSearch } from "@/store/slices/userSlice";
import useObserver from "./useObserver";

export function useListUsers() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    users,
    loading,
    error,
    search,
    hasMore,
    cursor,
    scrollY
  } = useAppSelector((state) => state.user);

  const fetchUsers = useCallback(() => {
    dispatch(clearUsers());
    dispatch(clearScrollY());
    dispatch(listUsersAsync({ username: search }));
  }, [dispatch, search]);

  const loadMoreUsers = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(loadMoreUsersAsync({
        cursor: cursor || undefined,
        username: search,
      }));
    }
  }, [dispatch, hasMore, loading, cursor, search]);

  const onReadUser = useCallback((id: string) => {
    dispatch(setScrollY(window.scrollY));
    navigate(`/users/${id}`);
  }, [navigate]);

  const onChange = useCallback((searchTerm: string) => {
    dispatch(setSearch(searchTerm));
  }, [dispatch]);

  const onSearch = useCallback(() => {
    dispatch(clearUsers());
    dispatch(clearScrollY());
    fetchUsers();
  }, [fetchUsers]);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && loadMoreUsers();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (users.length === 0) {
      dispatch(clearUsers());
      fetchUsers();
    }
  }, []);

  // 스크롤 위치 복원
  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return {
    users,
    loading,
    error,
    search,
    hasMore,
    onChange,
    onSearch,
    onReadUser,
    setTarget
  };
};