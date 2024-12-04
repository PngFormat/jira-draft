import { createTasks, fetchTasks, deleteTasks, updateTask } from '../redux/tasks/taskActions';
import { IFile, IStatus, ITask, IType, IUser } from '../interfaces';
import { AppDispatch, RootState } from '../redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const useTasks = (projectId?: number  | undefined) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const { tasks } = useSelector((state:any) => state.tasks.tasks);
  const error = useSelector<RootState, string>(
    (state: RootState) => state.tasks.error
  );

  const loading = useSelector<RootState, boolean>(
    (state: RootState) => state.tasks.loading
  );

  const fetchAllTasks = React.useCallback(() => {
    if (id || projectId) {
      dispatch(fetchTasks(id || projectId || 0));
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
          projectId: projectId || 0 ,
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

 const updateExistingTask = React.useCallback(
    (
      taskId: string | number,
      projectId: string | number,
      updatedTask: {
        title?: string;
        description?: string;
        statusId?: number;
        typeId?: number;
        userId?: number;
        timeAllotted?: number;
      },
      onSuccess?: () => void
    ) => {
      dispatch(updateTask({ taskId, projectId, updatedTask })).then((result) => {
        if (updateTask.fulfilled.match(result)) {
          if (onSuccess) onSuccess();
        } else {
          console.error('Failed to update task:', result.payload || result.error);
        }
      });
    },
    [dispatch]
  );

  // return { updateExistingTask };


  const deleteTask = React.useCallback(
    (taskId: number, onSuccess?: () => void) => {
      dispatch(deleteTasks({ projectId: projectId || 0, taskId })).then(() => {
        if (onSuccess) onSuccess();
      });
    },
    [dispatch, projectId]
  );

  const getTaskById = React.useCallback(
    (id: number | string | undefined) => {
      const task = tasks.find((task: any) => task.id === id);
      console.log('Found task:', task); 
      return task;
    },
    [tasks]
  )

  return {
    tasks,
    error,
    loading,
    fetchTasks: fetchAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    updateExistingTask,
  };
};

export default useTasks;
