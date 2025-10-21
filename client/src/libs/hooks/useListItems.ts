import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  clearItems,
  clearScrollY,
  setDivide,
  setName,
  setNative,
  setScrollY,
} from '../../store/slices/itemSlice';
import { listItemsAsync, loadMoreItemsAsync } from '../../store/thunks/itemThunks';
import { useObserver } from './useObserver';
import type { ItemDivideType, NativeLabel } from '../../types/item.types';

export function useListItems() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, loading, error, name, divide, native, cursor, hasMore, scrollY } = useAppSelector(
    (state) => state.item
  );

  const fetchItems = useCallback(() => {
    dispatch(clearItems());
    dispatch(clearScrollY());
    dispatch(listItemsAsync({ name, divide, native }));
  }, [dispatch, name, divide, native]);

  const loadMoreItems = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(
        loadMoreItemsAsync({
          cursor: cursor || undefined,
          name,
          divide,
          native,
        })
      );
    }
  }, [dispatch, hasMore, loading, name, divide, native, cursor]);

  const onReadItem = useCallback(
    (id: string) => {
      dispatch(setScrollY(window.scrollY));
      navigate(`/item/${id}`);
    },
    [navigate]
  );

  const onChange = useCallback(
    (searchTerm: string) => {
      dispatch(setName(searchTerm));
    },
    [dispatch]
  );

  const onSearchName = useCallback(() => {
    dispatch(clearItems());
    dispatch(clearScrollY());
    fetchItems();
  }, [fetchItems]);

  const onSearchDivide = useCallback(
    (divideName: ItemDivideType) => {
      dispatch(clearItems());
      dispatch(clearScrollY());
      dispatch(setDivide(divideName));
    },
    [dispatch]
  );

  const onSearchNative = useCallback(
    (nativeName: NativeLabel) => {
      dispatch(clearItems());
      dispatch(clearScrollY());
      dispatch(setNative(nativeName));
    },
    [dispatch]
  );

  const onAddItemPage = useCallback(() => {
    navigate('/item/add');
  }, [navigate]);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && loadMoreItems();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (items.length === 0) {
      dispatch(clearItems());
      fetchItems();
    }
  }, []);

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return {
    items,
    loading,
    error,
    name,
    onReadItem,
    onChange,
    onSearchName,
    onSearchDivide,
    onSearchNative,
    onAddItemPage,
    setTarget,
  };
}
