import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Project,ProjectState } from '../../interfaces';

export const createProject = createAsyncThunk(
    'projects/createProject',
    async(project:Project,{rejectWithValue,getState}) => {

        const state: any = getState();
        const token = state.auth.token || localStorage.getItem('token') as string;
      
  
        if (!token) {
          throw new Error('No token found');
        }

        try {
            const response = await axios.post('https://nodejs-jira-pet-project.onrender.com/api/projects/',
                project,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },

                }
            )
            alert('Created successfully')
            return response.data.project;
        }
        catch(error:any) {
            return rejectWithValue(error.response?.data || 'An error occurred');}
    }
)

export const fetchProjects = createAsyncThunk(
    'projects/fetch', 
    async (_, {getState,rejectWithValue}) => {
        const state: any = getState();
        const token = state.auth.token || localStorage.getItem('token') as string;

        try{
            const response = await axios.get('https://nodejs-jira-pet-project.onrender.com/api/projects/',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },

                }
            )
            
            return response.data;
        } catch(error:any) {
            return rejectWithValue(error.response?.data || 'An error occurred while fetching projects');
        }
    
    
  });

  export const deleteProjects = createAsyncThunk(
    'projects/delete',
    async (id:string,{getState,rejectWithValue}) => {
        const state: any = getState();
        const token = state.auth.token || localStorage.getItem('token') as string;

        try{
            const response = await axios.delete(`https://nodejs-jira-pet-project.onrender.com/api/projects/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },

                }
            )
            alert('Deleted successfully')
            return response.data;
        }catch(error:any) {
            return rejectWithValue(error.response?.data || 'An error occurred while fetching projects');

        }
    }
  )
