import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryType } from 'pages/Login';

export type reducerState = {
  accessToken: string | null;
  errors: string[];
};

const initialState: reducerState = {
  accessToken: null,
  errors: [],
};

const _updateAccessToken: CaseReducer<
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

export const inputSlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    updateAccessToken: _updateAccessToken,
    deleteAccessToken: (state) => {
      const newState = { ...state };
      newState.accessToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('lastLogin');
      return newState;
    },
  },
});

export const { updateAccessToken, deleteAccessToken } = inputSlice.actions;

export default inputSlice.reducer;
