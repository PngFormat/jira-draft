import { Alert } from '@mui/material';
import axios from 'axios';
import { Dispatch } from 'redux';
import { REGISTER_SUCCESS } from './registerActions';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

const validateEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const loginUser = (email: string, password: string,navigate: any) => {
  return async (dispatch: Dispatch) => {

    if(!validateEmail) {  
      dispatch({type: LOGIN_FAILURE, payload: 'Invalid email format'})
      alert('Invalid email format')
      return;
    }
    dispatch({ type: LOGIN_REQUEST });
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
      dispatch({type:REGISTER_SUCCESS,payload:response.data})
      alert('Login successfully')
      navigate('/projects')
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (error: any) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const logoutUser = (navigate: any) => {
  return (dispatch: Dispatch) => {
    localStorage.removeItem('authToken')
    dispatch({type: LOGOUT})
    navigate('/login')
  }
}

export default loginUser;
