import { createSlice } from '@reduxjs/toolkit';

export type reducerUIState = {
  showSidebar: boolean;
};

const initialState: reducerUIState = {
  showSidebar: false,
};

export const inputSlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    toggleShowSidebar: (state) => ({
      ...state,
      showSidebar: !state.showSidebar,
    }),
  },
});

export const { toggleShowSidebar } = inputSlice.actions;

export default inputSlice.reducer;
