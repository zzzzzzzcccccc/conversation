import initializeStore from "./store";
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import {GlobalState} from "@/store/slices/global";
import {AppState} from "@/store/slices/app";

const store = initializeStore();

export type RootState = {
  global: GlobalState
  app: AppState;
}
export type AppThunkDispatch = ThunkDispatch<any, string, any>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store
