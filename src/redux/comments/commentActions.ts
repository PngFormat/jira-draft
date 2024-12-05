import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IComment,IFile,IUser } from "../../interfaces";

interface CommentsState {
  comments: IComment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

interface FetchCommentsParams {
  projectId: number | string;
  taskId: number | string;
}

export interface CommentPayload {
    projectId: number;
    taskId: number;
    commentId?: number;
    message?: string; 
    userId?: number;
    user?: IUser;
    files?: IFile[];
    oldFiles?: IFile[]; 
  }
  

export const fetchComments = createAsyncThunk<IComment[], FetchCommentsParams>(
  "comments/fetchComments",
  async ({ projectId, taskId }, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.token || localStorage.getItem("token") as string;
      const response = await axios.get(
        `https://nodejs-jira-pet-project.onrender.com/api/projects/${projectId}/tasks/${taskId}/comments/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch comments");
    }
  }
);
export const createComment = createAsyncThunk<IComment, { projectId: number; taskId: number; commentData: { message: string; files?: IFile[] } }>(
    "comments/createComment",
    async ({ projectId, taskId, commentData }, { getState, rejectWithValue }) => {
      try {
        const state: any = getState();
        const token = state.auth.token || (localStorage.getItem("token") as string);
        const response = await axios.post(
          `https://nodejs-jira-pet-project.onrender.com/api/projects/${projectId}/tasks/${taskId}/comments/`,
          commentData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to create comment");
      }
    }
  );
  

  export const updateComment = createAsyncThunk<IComment, { projectId: number; taskId: number; commentId: number; commentData: Partial<CommentPayload> }>(
    "comments/updateComment",
    async ({ projectId, taskId, commentId, commentData }, { getState, rejectWithValue }) => {
      try {
        const state: any = getState();
        const token = state.auth.token || (localStorage.getItem("token") as string);
        const response = await axios.put(
          `https://nodejs-jira-pet-project.onrender.com/api/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
          commentData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to update comment");
      }
    }
  );
  

export const deleteComment = createAsyncThunk<number, { projectId: number; taskId: number; commentId: number }>(
    "comments/deleteComment",
    async ({ projectId, taskId, commentId }, { getState, rejectWithValue }) => {
      try {
        const state: any = getState();
        const token = state.auth.token || (localStorage.getItem("token") as string);
        await axios.delete(
          `https://nodejs-jira-pet-project.onrender.com/api/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return commentId; 
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to delete comment");
      }
    }
  );
  