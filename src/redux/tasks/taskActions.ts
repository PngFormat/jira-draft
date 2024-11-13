import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Project,ProjectState } from '../../interfaces';


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
  async (projectId: number| string,{getState}) => {

  const state: any = getState();
  const token = state.auth.token || localStorage.getItem('token') as string;

  const response = await axios.post(`https://nodejs-jira-pet-project.onrender.com/api/projects/${projectId}/tasks/`,{
      
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
      }
  );
  console.log(response.data)
  return response.data; 
});