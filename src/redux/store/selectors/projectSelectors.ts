import { createSelector } from 'reselect';
import { IProject } from '../../../interfaces';
import { RootState } from '../../store';

const projectsSelector = (state: RootState) => state.projects.projects;

export const projectInfoSelector = (projectId: number) =>
  createSelector([projectsSelector], (projects: IProject[]) => {
    console.log('Project selector', projects);
    return projects.find((project: IProject) => project.id == projectId);
  });
