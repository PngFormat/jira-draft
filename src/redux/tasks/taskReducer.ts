import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTasks } from "./taskActions";
import { ITask } from "../../interfaces";
import { createTasks } from "./taskActions";

interface TaskState {
    tasks: ITask[];
    loading: boolean;
    error: string;
}

const initialState:TaskState = {
    tasks: [] ,
    loading: false,
    error: '',
};



const taskSlice = createSlice({
    name:'tasks',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(fetchTasks.pending,(state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchTasks.fulfilled,(state,action) =>{
            state.loading = false;
            state.tasks = action.payload
        })
        .addCase(fetchTasks.rejected,(state,action) =>{
            state.loading = false;
            state.error = action.error.message as string;
        })

        .addCase(createTasks.pending, (state) => {
            state.loading = true;
            state.error = '';
          })
          .addCase(createTasks.fulfilled, (state, action: PayloadAction<ITask>) => {
            state.loading = false;
            state.tasks.push(action.payload); 
          })
          .addCase(createTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to create task';
          });
      },
    })

export default taskSlice.reducer;