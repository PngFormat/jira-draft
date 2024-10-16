
import React, { useState } from 'react';
import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import {loginUser} from '../redux/authActions';
import { AppDispatch } from '../redux/store';

interface User {
  id: number;
  login: string;
  password: string;
}

function AuthPage() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    dispatch(loginUser(email,password,navigate));
    setEmail('');
    setPassword('');
  };

  

  return (
    <Container maxWidth="sm">
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
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
    
    <p></p>
    <TextField
          label="Password"
          variant="outlined"
          type="password"
       
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
    
    <Button
      variant="outlined"
    
     sx={{ mt: 1 }}
     onClick={handleLogin}>SignIn</Button>
    <Button
     variant="outlined"
    
     sx={{ mt: 1 }}
     onClick= {() => { navigate('/registration')}}>Go to SignUp</Button>
      </Box>
    </Container>
  );

}
export default AuthPage;
