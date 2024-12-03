import { 
    deleteProjects, 
    createProject, 
    removeUserFromProject, 
    addUserToProject, 
    fetchProjects, 
    updateProject 
  } from '../redux/projectRedux/projectActions';
  
  import { IProject } from '../interfaces';
  import { AppDispatch, RootState } from '../redux/store';
  import React from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  
  const useProjects = () => {
    const dispatch = useDispatch<AppDispatch>();
  
    const { projects } = useSelector((state:any) => state.projects.projects);
  
    const error = useSelector<RootState, string | null>(
      (state: RootState) => state.projects.error
    );
  
    const loading = useSelector<RootState, boolean>(
      (state: RootState) => state.projects.loading
    );
  
    const fetchAllProjects = React.useCallback(() => {
      dispatch(fetchProjects());
    }, [dispatch]);
  
    const createNewProject = React.useCallback(
      (project: { title: string; description: string }, onSuccess?: () => void) => {
        dispatch(createProject(project)).then(() => {
          if (onSuccess) onSuccess();
        });
      },
      [dispatch]
    );
  
    const updateExistingProject = React.useCallback(
      (id: number, updatedData: Partial<IProject>, onSuccess?: () => void) => {
        dispatch(updateProject({ id, updatedData })).then(() => {
          if (onSuccess) onSuccess();
        });
      },
      [dispatch]
    );
  
    const deleteExistingProject = React.useCallback(
      (id: number, onSuccess?: () => void) => {
        dispatch(deleteProjects(id)).then(() => {
          if (onSuccess) onSuccess();
        });
      },
      [dispatch]
    );
  
    const addUser = React.useCallback(
      (projectId: number, userId: number, onSuccess?: () => void) => {
        dispatch(addUserToProject({ projectId, userId })).then(() => {
          if (onSuccess) onSuccess();
        });
      },
      [dispatch]
    );
  
    const removeUser = React.useCallback(
      (projectId: number, userId: number, onSuccess?: () => void) => {
        dispatch(removeUserFromProject({ projectId, userId })).then(() => {
          if (onSuccess) onSuccess();
        });
      },
      [dispatch]
    );
    

    const getProjectById = React.useCallback(
        (id: number | string | undefined) => {
          const project = projects.find((project: any) => project.id === id);
          console.log('Found project:', project); 
          return project;
        },
        [projects]
      );
      
  
    return {
      projects,
      error,
      loading,
      fetchAllProjects,
      createNewProject,
      updateExistingProject,
      deleteExistingProject,
      addUser,
      removeUser,
      getProjectById,
    };
  };
  
  export default useProjects;
  