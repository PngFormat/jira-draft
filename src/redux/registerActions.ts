import { Alert } from '@mui/material';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dispatch } from 'redux';

const validateEmail = (email: string) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password: string) => /^(?=.*[A-Za-z]).{6,32}$/.test(password);

const validateUsername = (username: string) => /[A-Za-z]/.test(username);

export const registerUser = createAsyncThunk (
    'auth/registerUser',
    async ({email,name,password,confirmPassword}: {email: string,name:string, password: string,confirmPassword: string }, thunkAPI) => {

        if (!validateEmail(email)) {
            return thunkAPI.rejectWithValue('Invalid email format')
        }

        if(!validateUsername(name)){
            return thunkAPI.rejectWithValue( 'Username must be filled!')
        }
        if(password !== confirmPassword) {
            return thunkAPI.rejectWithValue( 'Password do not match')

        }
        
        if(!validatePassword(password)){
            thunkAPI.rejectWithValue( 'The password must contain letters and be between 8 and 32 characters long')
            return;
        }

        try {
            const response = await axios.post('https://nodejs-jira-pet-project.onrender.com/api/users/registration',
                {email,name,password}, 
                { headers: {'Content-Type': 'application/json'}}
            );
            return response.data;

        }catch(error:any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed')
            
        }
    }
)