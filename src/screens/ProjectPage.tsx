import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/auth/authActions';
import { Button,Box } from '@mui/material';
import { AppDispatch } from '../redux/store';
import { ProjectComponent } from '../components/Project/ProjectListItem';
import { IProject,ProjectPageProps } from '../interfaces';
import CreateProject from '../components/Project/CreateProject';
import { Route } from 'react-router-dom';
import { fetchProjects } from '../redux/projectRedux/projectActions';
import { useSelector } from 'react-redux';


const ProjectPage: React.FC = () => {
  const dispatch:AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, loading, error } = useSelector((state:any) => state.projects);
  

  const handleLogout = () => {
    dispatch(logoutUser(navigate))
  }

  const handleNavigateProjectDetails = (id:string) => {
      navigate(`/projects/${id}`)
      console.log('Project clicked:', id);
    }

  useEffect(() => {
    const loadProjects = async () => {
      await dispatch(fetchProjects());
      
    }

    loadProjects();
  },[dispatch])
  const projectArray = projects?.projects || projects;
  

  return (
    <div>
      <div className='App'>
      <h1>Projects</h1>
      <Button
      variant="outlined"
      sx={{ mt: 1 }}
      onClick={handleLogout}>LogOut</Button>
      <Button
      variant="outlined"
      sx={{ mt: 1 }}
      onClick={() => navigate('/projects/create')}>Create project</Button>

      {loading ? (
                      <p>Loading projects...</p>
                  ) : error ? (
                      <p>Error: {error}</p>
                  ) :  projectArray && projectArray.length > 0 ? (
                      projectArray.map((project:any, index:any) => (
                          <ProjectComponent
                              onClick={() => handleNavigateProjectDetails(project.id)}
                              key={index}
                              id={project.id}
                              title={project.title}
                              description={project.description}
                          />
                      ))
                  ) : (
                      <p>No projects yet.</p>
                  )}
            
    </div>
    </div>
  );
}

export default ProjectPage;
