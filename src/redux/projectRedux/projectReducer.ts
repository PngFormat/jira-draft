import { createSlice } from "@reduxjs/toolkit";
import { ProjectState } from "../../interfaces";
import {
  createProject,
  fetchProjects,
  deleteProjects,
  addUserToProject,
  removeUserFromProject,
  updateProject,
} from "./projectActions";
import { Project } from "../../interfaces";

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [] as Project[],
    loading: false,
    error: null as string | null,
  } as ProjectState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(deleteProjects.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload.id
        );
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        const projectIndex = state.projects.findIndex(
          (project) => project.id === updatedProject.id
        );
        if (projectIndex !== -1) {
          state.projects[projectIndex] = updatedProject; 
        }
      })
      .addCase(addUserToProject.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        const projectIndex = state.projects.findIndex(
          (project) => project.id === updatedProject.id
        );
        if (projectIndex !== -1) {
          state.projects[projectIndex] = updatedProject;
        }
      })
      .addCase(removeUserFromProject.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        const projectIndex = state.projects.findIndex(
          (project) => project.id === updatedProject.id
        );
        if (projectIndex !== -1) {
          state.projects[projectIndex] = updatedProject;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default projectsSlice.reducer;
