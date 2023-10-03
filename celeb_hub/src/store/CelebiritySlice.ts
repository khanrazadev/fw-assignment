import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { celebsTypes } from "../types/types";
import { RootState } from "./store";
import celebsDataJsonList from "../utils/celebrities.json";
interface CelebsState {
  celebs: celebsTypes[];
}

const initialState: CelebsState = {
  celebs: celebsDataJsonList,
};

export const CelebiritySlice = createSlice({
  name: "celebs",
  initialState,
  reducers: {
    deleteCeleb: (state, action) => {
      state.celebs = state.celebs.filter(
        (celeb) => celeb.id !== action.payload
      );
    },
    editCeleb: (state, action: PayloadAction<Partial<celebsTypes>>) => {
      const { id, ...changes } = action.payload;
      const celebIndex = state.celebs.findIndex((celeb) => celeb.id === id);

      if (celebIndex !== -1) {
        // Create a new object with the updated properties while preserving the rest
        const updatedCeleb = {
          ...state.celebs[celebIndex],
          ...changes,
        };

        // Create a new array with the updated celebrity while preserving the rest
        state.celebs[celebIndex] = updatedCeleb;
      }
    },
  },
});

export const { deleteCeleb, editCeleb } = CelebiritySlice.actions;

export const getCelebsData = (state: RootState) => state.celebs;

export default CelebiritySlice.reducer;
