import { createSlice } from '@reduxjs/toolkit';
import loginUser from './authActions';
import { logoutUser } from './authActions';
import { IAuthState } from '../interfaces';

const storedToken = localStorage.getItem('authToken') || null;

const initialState: IAuthState = {
  token: storedToken,
  user:  null, 
  loading: false,
  error: '',
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LOGOUT: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('authToken'); 
      localStorage.removeItem('user'); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = '';

        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { LOGOUT } = authSlice.actions;

export default authSlice.reducer;
