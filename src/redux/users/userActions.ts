import { createAsyncThunk } from '@reduxjs/toolkit';
import { IType } from '../../interfaces';

export const fetchUsers = createAsyncThunk<IType[], void, { rejectValue: string }>(
  'users/fetchUsers',
  async (_, { rejectWithValue, getState }) => {
    const state: any = getState();
    const token = state.auth?.token || localStorage.getItem('token');

    try {
      const response = await fetch('https://nodejs-jira-pet-project.onrender.com/api/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return rejectWithValue('Failed to fetch types');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export default fetchUsers;
