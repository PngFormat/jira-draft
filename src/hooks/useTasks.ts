import { createTasks, fetchTasks, deleteTasks, updateTask } from '../redux/tasks/taskActions';
import { IFile, IStatus, ITask, IType, IUser } from '../interfaces';
import { AppDispatch, RootState } from '../redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const useTasks = (projectId: number | string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const tasks = useSelector<RootState, ITask[]>(
    (state: RootState) => state.tasks.tasks
  );

  const error = useSelector<RootState, string>(
    (state: RootState) => state.tasks.error
  );

  const loading = useSelector<RootState, boolean>(
    (state: RootState) => state.tasks.loading
  );

  const fetchAllTasks = React.useCallback(() => {
    if (id || projectId) {
      dispatch(fetchTasks(id || projectId));
    }
  }, [dispatch, id, projectId]);

  const createTask = React.useCallback(
    (
      title: string,
      description: string,
      status: IStatus,
      type: IType,
      user: IUser,
      timeAllotted: number,
      files: File[],
      onSuccess?: () => void
    ) => {
      dispatch(
        createTasks({
          projectId: projectId.toString(),
          task: {
            title,
            description,
            statusId: status.id,
            typeId: type.id,
            userId: user.id,
            timeAllotted,
          },
        })
      ).then(() => {
        if (onSuccess) onSuccess();
      });
    },
    [dispatch, projectId]
  );

  const updateTaskHandler = React.useCallback(
    (
      taskId: number | string,
      title: string,
      description: string,
      status: { id: number },
      type: { id: number },
      user: { id: number },
      timeAllotted: number,
      files: File[],
      oldFiles: any[],
      onSuccess?: () => void
    ) => {
      dispatch(
        updateTask({
          projectId: projectId.toString(),
          taskId,
          updatedTask: {
            title,
            description,
            statusId: status.id,
            typeId: type.id,
            userId: user.id,
            timeAllotted,
          },
        })
      ).then(() => {
        if (onSuccess) onSuccess();
      });
    },
    [dispatch, projectId]
  );

  const deleteTask = React.useCallback(
    (taskId: number, onSuccess?: () => void) => {
      dispatch(deleteTasks({ projectId: projectId.toString(), taskId })).then(() => {
        if (onSuccess) onSuccess();
      });
    },
    [dispatch, projectId]
  );

  return {
    tasks,
    error,
    loading,
    fetchTasks: fetchAllTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};

export default useTasks;
