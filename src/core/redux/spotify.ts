import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormatedTrack } from 'core/hooks/useTrackSearch';
import { QueryType } from 'pages/Login';

export interface userType {
  country: string;
  display_name: string;
  email: string;
  href: string;
  id: string;
  images: {
    height: null;
    url: string;
    width: null;
  }[];
  product: string;
  type: string;
  uri: string;
}

export type reducerState = {
  accessToken: string | null;
  errors: string[];
  selectedSongs: FormatedTrack[];
  user: userType | null;
};

const initialState: reducerState = {
  accessToken: null,
  errors: [],
  selectedSongs: [],
  user: null,
};

const _updateAccessTokenAndStorage: CaseReducer<
  reducerState,
  PayloadAction<QueryType>
> = (state, action) => {
  const newState = { ...state };
  const data: QueryType = action.payload;
  newState.accessToken = data.access_token;

  localStorage.setItem('accessToken', data.access_token);
  localStorage.setItem('expiresIn', data.expires_in);
  localStorage.setItem('lastLogin', data.last_login);
  return newState;
};

const _updateAccessToken: CaseReducer<reducerState, PayloadAction<string>> = (
  state,
  action
) => ({ ...state, accessToken: action.payload });

type deleteAccessTokenPayloadType = {
  errors?: string[];
};
const _deleteAccessToken: CaseReducer<
  reducerState,
  PayloadAction<deleteAccessTokenPayloadType>
> = (state, action) => {
  const { errors = [] } = action.payload;
  const newState = {
    ...state,
    accessToken: null,
    errors: errors,
  };
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expiresIn');
  localStorage.removeItem('lastLogin');
  localStorage.removeItem('userData');
  return newState;
};

const _toggleSelectedSong: CaseReducer<
  reducerState,
  PayloadAction<FormatedTrack>
> = (state, action) => {
  const newState = { ...state };
  const song = action.payload;
  const found = newState.selectedSongs.find((data) => data.uri === song.uri);

  if (found) {
    newState.selectedSongs = newState.selectedSongs.filter(
      (data) => data.uri !== song.uri
    );
  } else {
    newState.selectedSongs = [...newState.selectedSongs, song];
  }
  localStorage.setItem('selectedSong', JSON.stringify(newState.selectedSongs));
  return newState;
};

const _updateUser: CaseReducer<reducerState, PayloadAction<userType>> = (
  state,
  action
) => {
  const newState = { ...state, user: action.payload };

  // localStorage.setItem('userData', JSON.stringify(action.payload));
  return newState;
};

export const inputSlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    updateAccessTokenAndStorage: _updateAccessTokenAndStorage,
    updateAccessToken: _updateAccessToken,
    deleteAccessToken: _deleteAccessToken,
    toggleSelectedSong: _toggleSelectedSong,
    updateUser: _updateUser,
    updateSelectedSongFromLocalStorage: (state) => {
      const newState = { ...state };
      const arrSelectedSongStr = localStorage.getItem('selectedSong');
      if (arrSelectedSongStr)
        newState.selectedSongs = JSON.parse(arrSelectedSongStr);
      return newState;
    },
    resetSelectedSongs: (state) => {
      const newState = { ...state, selectedSongs: [] };
      localStorage.setItem(
        'selectedSong',
        JSON.stringify(newState.selectedSongs)
      );
      return newState;
    },
  },
});

export const {
  updateAccessTokenAndStorage,
  updateSelectedSongFromLocalStorage,
  deleteAccessToken,
  updateAccessToken,
  toggleSelectedSong,
  resetSelectedSongs,
  updateUser,
} = inputSlice.actions;

export default inputSlice.reducer;
