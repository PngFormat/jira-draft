import { createSelector } from '@reduxjs/toolkit';
import { IProject } from '../../../interfaces';
import { RootState } from '../../store';


const projectsSelector = (state: RootState) => state.projects.projects;

export const projectInfoSelector = (projectId: number) =>
    createSelector([projectsSelector], (projects: IProject[]) =>
      projects.find((project: IProject) => project.id === projectId)
    );