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
  return newState;
};

export const inputSlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    updateAccessTokenAndStorage: _updateAccessTokenAndStorage,
    updateAccessToken: _updateAccessToken,
    deleteAccessToken: _deleteAccessToken,
  },
});

export const {
  updateAccessTokenAndStorage,
  deleteAccessToken,
  updateAccessToken,
} = inputSlice.actions;

export default inputSlice.reducer;
