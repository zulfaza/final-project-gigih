import { configureStore } from "@reduxjs/toolkit";
import SpotifyReducer, { reducerState } from "./slice";

export interface selectorProps {
  spotify: reducerState;
}

export default configureStore({
  reducer: {
    spotify: SpotifyReducer,
  },
  //   devTools: true,
});
