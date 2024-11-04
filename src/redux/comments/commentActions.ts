import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../interfaces";
import axios from "axios";


export const fetchComments = createAsyncThunk<IComment[], void>(
    'comments/fetchComments',
    async (_, { getState }) => {
        const state: any = getState();

        const token = state.auth.token || localStorage.getItem('token') as string;
        const response = await axios.get('https://nodejs-jira-pet-project.onrender.com/api/projects/12/tasks/126/comments/', {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data;
    }
);

