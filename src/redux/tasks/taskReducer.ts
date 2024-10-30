import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "./taskActions";
import { ITask } from "../../interfaces";

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
    }})

export default taskSlice.reducer;