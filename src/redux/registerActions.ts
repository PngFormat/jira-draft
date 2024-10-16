import { Alert } from '@mui/material';
import axios from 'axios';
import { Dispatch } from 'redux';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordPattern = /^(?=.*[A-Za-z]).{6,32}$/;
    return passwordPattern.test(password);
  };
  const validateUsername = (username: string) => {
    const passwordPattern = /[A-Za-z]/;
    return passwordPattern.test(username);
  };

export const registerUser = (email:string, name: string, password:string,confirmPassword: string) => {
    return async (dispatch: Dispatch) => {
        dispatch({type: REGISTER_REQUEST});

        if (!validateEmail(email)) {
            dispatch({type: REGISTER_FAILURE,payload: 'Invalid email format'})
            return;
        }

        if(!validateUsername(name)){
            dispatch({type: REGISTER_FAILURE,payload: 'Username must be filled!'})
            return;
        }
        if(password !== confirmPassword) {
            dispatch({type: REGISTER_FAILURE,payload: 'Password do not match'})
            return;
        }
        
        if(!validatePassword(password)){
            dispatch({type: REGISTER_FAILURE,payload: 'The password must contain letters and be between 8 and 32 characters long'})
            return;
        }

        try {
            const response = await axios.post('https://nodejs-jira-pet-project.onrender.com/api/users/registration',
                {email,name,password}, 
                { headers: {'Content-Type': 'application/json'}}
            );

                dispatch({type: REGISTER_SUCCESS, payload: response.data})
        }catch(error:any) {
            dispatch({
                type: REGISTER_FAILURE,
                payload: error.response.data.message 
            });
            
        }
    }
}