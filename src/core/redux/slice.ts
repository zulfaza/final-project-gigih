import { createSlice } from "@reduxjs/toolkit";

export interface reducerState {
  accessToken: string | null;
}

export const inputSlice = createSlice({
  name: "spotify",
  initialState: {
    accessToken: null,
  },
  reducers: {
    updateAccessToken: (state, action) => {
      const newState = { ...state };
      newState.accessToken = action.payload;
      return newState;
    },
  },
});

export const { updateAccessToken } = inputSlice.actions;

export default inputSlice.reducer;
