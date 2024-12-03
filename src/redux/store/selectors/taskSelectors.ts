import { createSelector } from 'reselect';
import { RootState } from '../../store';
import { ITask } from '../../../interfaces';

const tasksSelector = (state: RootState) => state.tasks.tasks; 

export const taskInfoSelector = (taskId: number) =>
  createSelector([tasksSelector], (tasks: ITask[] | undefined) => {
    if (!Array.isArray(tasks)) {
      // console.error("Expected tasks to be an array but got:", tasks);
      return null;
    }
    
    // Ищем задачу по taskId
    return tasks.find((task) => task.id === taskId) || null;
  });
