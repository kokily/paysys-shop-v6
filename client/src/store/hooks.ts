import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";

// AppDispatch 타입 사용으로 안전성 보장
export const useAppDispatch = useDispatch<AppDispatch>;

// RootState 타입을 사용하여 안정성 보장
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;