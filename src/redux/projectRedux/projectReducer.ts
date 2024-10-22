import { createSlice } from "@reduxjs/toolkit"
import { ProjectState } from "../../interfaces"
import { createProject } from "./projectActions"

export const initialState: ProjectState = {
    projects: [],
    loading: false,
    error: null,
}

export const projectSlice = createSlice({
    name:'projects',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(createProject.pending,(state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createProject.fulfilled,(state,action) =>{
            state.loading = false;
            state.projects.push(action.payload);
        })
        .addCase(createProject.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        
    }

})

export default projectSlice.reducer;
  