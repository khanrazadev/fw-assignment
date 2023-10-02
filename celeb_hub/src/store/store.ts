import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook } from "react-redux";
import celebs from "../store/CelebiritySlice";
export const store = configureStore({
  reducer: {
    celebs,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useDispatch;
