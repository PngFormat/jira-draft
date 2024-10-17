import { createSlice } from '@reduxjs/toolkit';
import loginUser from './authActions';
import { logoutUser } from './authActions';
import { IAuthState,IAction } from '../interfaces';


const initialState: IAuthState = {
  token:null,
  user:null,
  loading: false,
  error: '',
};


const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    LOGOUT: (state) => {
      state.user = null;
      state.token = null
    }
  },
  extraReducers:(builder) => {
    builder
    .addCase(loginUser.pending,(state) => {
      state.loading = true;
      state.error = ''
    })
    .addCase(loginUser.fulfilled ,(state,action)=>{
      state.loading= false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = '';
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { LOGOUT } = authSlice.actions;

export default authSlice.reducer;
// const authReducer = (state = initialState, action: Action): AuthState => {
//   switch (action.type) {
//     case LOGIN_REQUEST:
//       return { ...state, loading: true, error: '' };
//     case LOGIN_SUCCESS:
//       return { ...state, user: action.payload.user,token: action.payload.token, loading: false, error: '' };
//     case LOGIN_FAILURE:
//       return { ...state, loading: false, error: action.payload }; 
//     case LOGOUT: 
//       return {user: null,token: null,loading:false, error: ''}
//     default:
//       return state;
//   }
// };


