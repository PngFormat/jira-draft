import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import registerReducer from './registerReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
