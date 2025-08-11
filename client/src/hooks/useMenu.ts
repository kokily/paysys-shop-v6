import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from "react";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addCartAsync, listMenuAsync, readMenuAsync, setFilters, updateCartInputs } from "@/store/slices/menuSlice";
import { showToast } from "@/utils/toast";

export function useListMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { menuList, loading, error } = useAppSelector((state) => state.menu);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const divide = searchParams.get('divide') || '';
    const native = searchParams.get('native') || '';

    if (divide && native) {
      dispatch(setFilters({ divide, native }));
      dispatch(listMenuAsync({ divide, native }));
    }
  }, [location.search, dispatch]);

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onReadMenu = useCallback((id: string) => {
    navigate(`/menu/${id}`);
  }, [navigate]);

  return {
    menu: menuList,
    loading,
    error,
    onBack,
    onReadMenu,
  };
};

export function useReadMenu() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentMenu, loading, error, cartInputs } = useAppSelector((state) => state.menu);
  const { count, price } = cartInputs;

  useEffect(() => {
    if (id) {
      dispatch(readMenuAsync(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentMenu) {
      if (currentMenu?.price !== 0) {
        dispatch(updateCartInputs({ price: currentMenu.price.toString() }));
      } else {
        dispatch(updateCartInputs({ price: '' }));
      }
    }
  }, [currentMenu, dispatch])

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateCartInputs({ [name]: value }));
  }, [dispatch]);

  const onAddCart = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();

    const countNum = parseInt(count) || 0;
    const priceNum = parseInt(price) || 0
    if (countNum < 1 || priceNum < 1) {
      showToast.warning('단가 또는 수량을 입력하세요.');
      return;
    }

    try {
      await dispatch(addCartAsync({
        item_id: id!,
        count: countNum,
        price: priceNum,
      })).unwrap();
      showToast.success('메뉴 추가!');
      navigate(-1);
    } catch (error: any) {
      showToast.error(error.message || '카트 추가 실패');
    }
  }, [id, count, price, navigate, dispatch]);

  const onKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddCart(e);
    }
  }, [onAddCart]);

  return {
    menu: currentMenu,
    count,
    price,
    loading,
    error,
    onBack,
    onChange,
    onAddCart,
    onKeyPress,
  };
};