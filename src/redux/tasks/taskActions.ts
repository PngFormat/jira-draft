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

interface CreateTaskPayload {
  projectId: number | string;
  task: {
    title: string;
    description: string;
    status: string;
    type: string;  
    user: string;  
    timeAllotted: number;
    files: File[];
  };
}

export const createTasks = createAsyncThunk(
  'tasks/createTasks',
  async ({ projectId, task }: CreateTaskPayload, { getState }) => {
    const state: any = getState();
    const token = state.auth.token || localStorage.getItem('token') as string;

    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const formData = new FormData();
    formData.append('title', task.title);
    formData.append('description', task.description);
    formData.append('status', task.status);
    formData.append('type', task.type);
    formData.append('user', task.user);
    formData.append('timeAllotted', task.timeAllotted.toString());
    task.files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await axios.post(
      `https://nodejs-jira-pet-project.onrender.com/api/projects/${projectId}/tasks/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);