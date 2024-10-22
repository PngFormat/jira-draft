import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/authActions';
import { Button,Box } from '@mui/material';
import { AppDispatch } from '../redux/store';
import { ProjectComponent } from '../components/Project/ProjectComponent';
import { IProject,ProjectPageProps } from '../interfaces';
import CreateProject from '../components/Project/CreateProject';
import { Route } from 'react-router-dom';


const ProjectPage: React.FC<ProjectPageProps> = ({ projects }) => {
  const dispatch:AppDispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser(navigate))
  }

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

      
      <div>
      </div>
      {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectComponent
              key={index}
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
