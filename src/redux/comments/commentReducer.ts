import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../interfaces"
import { fetchComments } from "./commentActions";

interface ICommentState {
    comments: IComment[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: ICommentState = {
    comments: [],
    loading: false,
    error: null,
  };

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<IComment>) => {
            state.comments.push(action.payload);
        },
        updateComment: (state, action:PayloadAction<IComment>) => {
            const index = state.comments.findIndex(comment => comment.id === action.payload.id)
            if(index !== -1) {
                state.comments[index] = action.payload;
            }
        },
        deleteComment: (state, action:PayloadAction<number>) => {
            state.comments = state.comments.filter(comment => comment.id !== action.payload)
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchComments.pending,(state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchComments.fulfilled, (state, action: PayloadAction<IComment[]>) => {
            state.loading = false;
            state.comments = action.payload
        })
        .addCase(fetchComments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch comments";
          });
        }
})

export const { addComment, updateComment, deleteComment} = commentSlice.actions
export default commentSlice.reducer;