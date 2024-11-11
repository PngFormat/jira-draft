import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IType } from '../../interfaces';
import { fetchStatuses } from './statusActions';

interface StatusState {
  statuses: IType[];
  loading: boolean;
  error: string | null;
}

const initialState: StatusState = {
  statuses: [],
  loading: false,
  error: null,
};

const typesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatuses.fulfilled, (state, action: PayloadAction<IType[]>) => {
        state.loading = false;
        state.statuses = action.payload;
      })
      .addCase(fetchStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch statuses';
      });
  },
});

export default typesSlice.reducer;
