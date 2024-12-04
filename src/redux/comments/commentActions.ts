import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../interfaces";
import axios from "axios";

interface FetchCommentsParams {
    projectId: number | string;
    taskId: number | string;
  }

export const fetchComments = createAsyncThunk<IComment[],FetchCommentsParams>(
    'comments/fetchComments',
    async ({ projectId, taskId }, { getState }) => {
        const state: any = getState();

        const token = state.auth.token || localStorage.getItem('token') as string;
        const response = await axios.get(
            `https://nodejs-jira-pet-project.onrender.com/api/projects/${projectId}/tasks/${taskId}/comments/`,
            {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data;
    }
);

