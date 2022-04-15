import { configureStore } from '@reduxjs/toolkit';
import SpotifyReducer, { reducerState } from './spotify';
import UIReducer, { reducerUIState } from './ui';

export type selectorProps = {
  spotify: reducerState;
  ui: reducerUIState;
};

export default configureStore({
  reducer: {
    spotify: SpotifyReducer,
    ui: UIReducer,
  },
  devTools: true,
});
