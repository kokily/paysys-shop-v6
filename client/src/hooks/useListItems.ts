import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearItems, clearScrollY, listItemsAsync, loadMoreItemsAsync, setDivide, setNative, setScrollY, setSearch } from "@/store/slices/itemSlice";
import useObserver from "./useObserver";

export function useListItems() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    items,
    loading,
    error,
    search,
    divide,
    native,
    hasMore,
    cursor,
    scrollY
  } = useAppSelector((state) => state.item);

  const fetchItems = useCallback(() => {
    dispatch(clearItems());
    dispatch(clearScrollY());
    dispatch(listItemsAsync({ name: search, divide, native }));
  }, [dispatch, search, divide, native]);

  const loadMoreItems = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(loadMoreItemsAsync({
        cursor: cursor || undefined,
        name: search,
        divide,
        native,
      }));
    }
  }, [dispatch, hasMore, loading, cursor, search, divide, native]);

  const onReadItem = useCallback((id: string) => {
    dispatch(setScrollY(window.scrollY));
    navigate(`/item/${id}`);
  }, [navigate]);

  const onChange = useCallback((searchTerm: string) => {
    dispatch(setSearch(searchTerm));
  }, [dispatch]);

  const onDivideSearch = useCallback((divideName: string) => {
    dispatch(clearItems());
    dispatch(clearScrollY());
    dispatch(setDivide(divideName));
  }, [dispatch]);

  const onNativeSearch = useCallback((nativeName: string) => {
    dispatch(clearItems());
    dispatch(clearScrollY());
    dispatch(setNative(nativeName));
  } ,[dispatch]);

  const onSearch = useCallback(() => {
    dispatch(clearItems());
    dispatch(clearScrollY());
    fetchItems();
  }, [fetchItems]);

  const onAddItemPage = useCallback(() => {
    navigate('/items/add');
  }, [navigate]);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && loadMoreItems();
  }

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
    search,
    hasMore,
    onChange,
    onSearch,
    onReadItem,
    onDivideSearch,
    onNativeSearch,
    onAddItemPage,
    setTarget
  };
};