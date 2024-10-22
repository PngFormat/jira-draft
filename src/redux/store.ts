import { configureStore } from '@reduxjs/toolkit';
import {thunk,ThunkDispatch} from 'redux-thunk';
import authReducer from './authReducer';
import { AnyAction } from 'redux';
import registerReducer from './registerReducer';
import projectReducer from './projectRedux/projectReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    projects: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, AnyAction>;

export default store;

