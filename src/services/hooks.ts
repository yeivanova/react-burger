import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { RootState, TAppDispatch } from "./types";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<TAppDispatch>();
