import { Alert } from '@mui/material';
import axios from 'axios';
import { Dispatch } from 'redux';
import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

const validateEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
// (email: string, password: string,navigate: any)
export const loginUser = createAsyncThunk (
  // return async (dispatch: Dispatch) => {
    'auth/login',
    async({email,password }: { email: string, password: string }, thunkAPI:any) => {
      if(!validateEmail) {  
        // dispatch({type: LOGIN_FAILURE, payload: 'Invalid email format'})
        // alert('Invalid email format')
        return thunkAPI.isRejectedWithValue('Invalid email format');
      }
      // dispatch({ type: LOGIN_REQUEST });
      try {
        const response = await axios.post(
          'https://nodejs-jira-pet-project.onrender.com/api/users/login',
          { email, password }, 
          { 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwibmFtZSI6IkFkbWluIG5hbWUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3Mjc4OTc4ODMsImV4cCI6MTcyNzk4NDI4M30.Jry-_1ip-5F-AAy2yIIqGyw61bvff0A-KcQFjSH4UlA`
            }
          }
        );

        const token = response.data.token;
        localStorage.setItem('authToken',token);
        alert('Login successfully')
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
      }
    }
);

export const logoutUser = (navigate: any) => {
  return (dispatch: Dispatch) => {
    localStorage.removeItem('authToken')
    dispatch({type: LOGOUT})
    navigate('/login')
  }
}

export default loginUser;
