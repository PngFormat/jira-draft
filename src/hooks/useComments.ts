import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, updateComment, fetchComments, deleteComment } from '../redux/comments/commentActions';
import { IComment, IFile } from '../interfaces';
import { AppDispatch, RootState } from '../redux/store';

const useComments = (projectId: number, taskId: number) => {
  const dispatch = useDispatch<AppDispatch>();

  const comments = useSelector((state: any) => state.comments.comments
  );
  const error = useSelector<RootState, string | null>(
    (state) => state.comments.error
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.comments.loading
  );

  const fetchCommentsFunc = React.useCallback(() => {
    dispatch(fetchComments({ projectId, taskId }));
  }, [dispatch, projectId, taskId]);

  
  const createCommentFunc = React.useCallback(
    (message: string, files: File[], onSuccess?: () => void) => {
      dispatch(
        createComment({
          projectId,
          taskId,
          commentData: { message, files: files as unknown as IFile[]},
        })
      );
    },
    [dispatch, projectId, taskId]
  );

  const updateCommentFunc = React.useCallback(
    (
      commentId: number,
      message: string,
      files: File[],
      oldFiles: IFile[],
      onSuccess?: () => void
    ) => {
      dispatch(
        updateComment({
          projectId,
          taskId,
          commentId,
          commentData: { message, files: files as unknown as IFile[] , oldFiles },
        })
      );
    },
    [dispatch, projectId, taskId]
  );

  // Delete comment
  const deleteCommentFunc = React.useCallback(
    (commentId: number, onSuccess?: () => void) => {
      dispatch(
        deleteComment({
          projectId,
          taskId,
          commentId,
        })
      );
    },
    [dispatch, projectId, taskId]
  );

  return {
    comments,
    error,
    loading,
    fetchComments: fetchCommentsFunc,
    createComment: createCommentFunc,
    updateComment: updateCommentFunc,
    deleteComment: deleteCommentFunc,
  };
};

export default useComments;
