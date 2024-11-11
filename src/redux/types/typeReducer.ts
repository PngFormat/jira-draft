
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IType } from '../../interfaces';
import { fetchTypes } from './typeActions';

interface TypesState {
  types: IType[];
  loading: boolean;
  error: string | null;
}

const initialState: TypesState = {
  types: [],
  loading: false,
  error: null,
};

const typesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTypes.fulfilled, (state, action: PayloadAction<IType[]>) => {
        state.loading = false;
        state.types = action.payload;
      })
      .addCase(fetchTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch types';
      });
  },
});

export default typesSlice.reducer;
