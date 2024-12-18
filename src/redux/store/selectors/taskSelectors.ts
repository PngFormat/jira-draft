import { ITask } from '../../../interfaces';
import { RootState } from '../../store';
import { createSelector } from 'reselect';

const tasksSelector = (state: RootState) => state.tasks.tasks;

export const taskInfoSelector = (taskId: number) =>
  createSelector([tasksSelector], (tasks: ITask[]) =>{
    // return tasks.find((task: ITask) => task.id == taskId)
  });