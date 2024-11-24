import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Project,ProjectState } from '../../interfaces';
import { ITask } from '../../interfaces';
import { Alert } from '@mui/material';
import { AxiosError } from 'axios';


export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks', 
    async (projectId: number| string,{getState}) => {

    const state: any = getState();
    const token = state.auth.token || localStorage.getItem('token') as string;

    const response = await axios.get(`https://nodejs-jira-pet-project.onrender.com/api/projects/${projectId}/tasks/`,{
        
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        }
    );
    console.log(response.data)
    return response.data; 
});

export const createTasks = createAsyncThunk(
  'tasks/createTasks',
  async (
    { task, projectId }: { task: { title: string; description: string; statusId: number; typeId: number; userId: number; timeAllotted: number }, projectId: string },
    { getState, rejectWithValue }
  ) => {
    const state: any = getState();
    const token = state.auth.token || localStorage.getItem('token') as string;

    try {
      const response = await axios.post(
        `https://nodejs-jira-pet-project.onrender.com/api/projects/${projectId}/tasks/`,
        task, 
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Task created successfully');
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error("Server Error:", error.response.data);
          return rejectWithValue(error.response.data); 
        } else if (error.request) {
          console.error("Request Error:", error.request);
          return rejectWithValue("No response received from the server");
        } else {
          console.error("Error:", error.message);
          return rejectWithValue(error.message); 
        }
      } else {
        console.error("Unknown error:", error);
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

