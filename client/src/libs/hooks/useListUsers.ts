import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearScrollY, clearUsers, setScrollY, setUsername } from '../../store/slices/userSlice';
import { listUsersAsync, loadMoreUsersAsync } from '../../store/thunks/userThunks';
import { useObserver } from './useObserver';

export function useListUsers() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users, loading, error, username, cursor, hasMore, scrollY } = useAppSelector((state) => state.user);

  const fetchUsers = useCallback(() => {
    dispatch(clearUsers());
    dispatch(clearScrollY());
    dispatch(listUsersAsync({ username }));
  }, [dispatch, username]);

  const loadMoreUsers = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(
        loadMoreUsersAsync({
          cursor: cursor || undefined,
          username,
        })
      );
    }
  }, [dispatch, hasMore, loading, cursor, username]);

  const onReadUser = useCallback(
    (id: string) => {
      dispatch(setScrollY(window.scrollY));
      navigate(`/user/${id}`);
    },
    [navigate]
  );

  const onChange = useCallback(
    (searchTerm: string) => {
      dispatch(setUsername(searchTerm));
    },
    [dispatch]
  );

  const onSearchUsername = useCallback(() => {
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

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return {
    users,
    loading,
    error,
    username,
    onReadUser,
    onChange,
    onSearchUsername,
    setTarget,
  };
}
