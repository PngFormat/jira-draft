
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IType } from '../../interfaces';
import { response } from 'express';

export const fetchTypes = createAsyncThunk<IType[], void, { rejectValue: string }>(
  'types/fetchTypes',
  async (_, { rejectWithValue,getState }) => {

    const state: any = getState();
    const token = state.auth.token || localStorage.getItem('token') as string;
    try {
      const response = await fetch('https://nodejs-jira-pet-project.onrender.com/api/types',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        return rejectWithValue('Failed to fetch types');
      }
      const data = await response.json();
      console.log('Types', data)
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }

  }
  
);

export default fetchTypes;