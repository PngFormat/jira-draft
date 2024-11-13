import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IType } from '../../interfaces';
import fetchUsers from './userActions';

interface UsersState {
  users: IType[];      
  loading: boolean;        
  error: string | null;    
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IType[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
      });
  },
});

export default usersSlice.reducer;
