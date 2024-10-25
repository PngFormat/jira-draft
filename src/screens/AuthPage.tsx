
import React, { useEffect, useState } from 'react';
import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import {loginUser} from '../redux/authActions';
import { AppDispatch } from '../redux/store';

function AuthPage() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('denAdmin@gmail.com');
  const [password, setPassword] = useState('123456Den');
  const [error, setError] = useState('');
  const authToken = localStorage.getItem('authToken')

  const handleLogin = async () => {
    const result = await dispatch(loginUser({email,password}));
    if(loginUser.fulfilled.match(result)){
      navigate('/projects')
      console.log(authToken)
    }
  };

  return (
    <Container maxWidth="sm">
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      <TextField
          label="Email"
          variant="outlined"
          error= {!!error}
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={error}
        />
    
    
    <TextField
          label="Password"
          variant="outlined"
          type="password"
       
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
    
    <Button
      variant="contained"
    
     sx={{ mt: 1,width:"220px" }}
     
     onClick={handleLogin}>SignIn</Button>
    <Button
     variant="contained"
    
     sx={{ mt: 1,width:"220px" }}
     onClick= {() => { navigate('/registration')}}>Go to SignUp</Button>
      </Box>
    </Container>
  );

}
export default AuthPage;
