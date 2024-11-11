import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Project,ProjectState } from '../../interfaces';


export const fetchStatuses = createAsyncThunk(
    'tasks/fetchStatuses', 
    async (_, { rejectWithValue, getState }) => {
    const state: any = getState();
    const token = state.auth.token || localStorage.getItem('token') as string;

    const response = await axios.get(`https://nodejs-jira-pet-project.onrender.com/api/statuses`,{
        
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        }
    );
    console.log(response.data)
    return response.data; 
});

export default fetchStatuses;