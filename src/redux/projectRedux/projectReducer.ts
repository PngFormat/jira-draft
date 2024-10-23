import { createSlice,PayloadAction } from "@reduxjs/toolkit"
import { ProjectState } from "../../interfaces"
import { createProject,fetchProjects } from "./projectActions"
import { Project } from "../../interfaces"

export const initialState: ProjectState = {
    projects: [],
    loading: false,
    error: null || '',
}

export const projectSlice = createSlice({
    name:'projects',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(createProject.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createProject.fulfilled, (state, action: PayloadAction<Project>) => {
            state.loading = false;
            state.projects.push(action.payload);
        })
        .addCase(createProject.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; 
        })
        .addCase(fetchProjects.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
            state.loading = false;
            state.projects = action.payload;
        })
        .addCase(fetchProjects.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        
    }

})

export default projectSlice.reducer;
  