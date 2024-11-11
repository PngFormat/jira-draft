import { configureStore } from '@reduxjs/toolkit';
import {thunk,ThunkDispatch} from 'redux-thunk';
import authReducer from './auth/authReducer';
import { AnyAction } from 'redux';
import registerReducer from './register/registerReducer';
import projectReducer from './projectRedux/projectReducer';
import tasksReducer from './tasks/taskReducer';
import commentReducer from './comments/commentReducer';
import typeReducer from './types/typeReducer';
import statusReducer from './statuses/statusReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    projects: projectReducer,
    tasks: tasksReducer,
    comments: commentReducer,
    types: typeReducer,
    statuses: statusReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, AnyAction>;

export default store;

