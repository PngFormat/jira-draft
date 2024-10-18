import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/authActions';
import { Button } from '@mui/material';
import { AppDispatch } from '../redux/store';

function ProjectPage() {
  const dispatch:AppDispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser(navigate))
  }


  return (
    <div className="App">
      <h1>Projects</h1>
      <Button
      variant="outlined"
      sx={{ mt: 1 }}
      onClick={handleLogout}>LogOut</Button>

      <Button
      variant="outlined"
      sx={{ mt: 1 }}
      onClick={() => navigate('/projects/create')}>Create project</Button>
      

    
    </div>
  );
}

export default ProjectPage;
