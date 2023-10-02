import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { celebsTypes } from "../types/types";
import celebsDataListJson from "../utils/celebrities.json";
import { RootState } from "./store";

interface CelebsState {
  celebs: celebsTypes[];
}

const initialState: CelebsState = {
  celebs: celebsDataListJson,
};

export const CelebiritySlice = createSlice({
  name: "celebs",
  initialState,
  reducers: {
    setCelebs: (state, action: PayloadAction<celebsTypes[]>) => {
      // Update the 'celebs' state with the new array of celebrities
      state.celebs = action.payload;
    },
  },
});

export const { setCelebs } = CelebiritySlice.actions;

export const getCelebsData = (state: RootState) => state.celebs;

export default CelebiritySlice.reducer;
