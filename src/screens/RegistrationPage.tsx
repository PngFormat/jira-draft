import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/registerActions';
import { AppDispatch } from '../redux/store';

function RegistrationPage() {

  const dispatch: AppDispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState<string>('USER');

  const handleRegister = async () => {
    const result = await dispatch(registerUser({email, password, name: username,confirmPassword,role}));
    if (registerUser.rejected.match(result)) {
      alert(result.payload);  
      setError(result.payload as string);
    } else if (registerUser.fulfilled.match(result)) {
      alert('Registration successful!');
      setError('');  
      navigate('/login'); 
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.checked ? 'ADMIN' : 'USER');  
  };

  useEffect(() => {
    console.log(role)
  },[role])
  
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      <TextField
          label="Email"
          variant="outlined"

          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          helperText={error}
        />
      <p></p>
      <TextField 
        type='text' 
        label='Name'
        margin="normal"
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        error={!!error}
      />
       <p></p>
       <TextField
          label="Password"
          variant="outlined"
          type="password"
         
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error && password.length < 6}
          helperText={error && password.length < 6 ? 'Password must be at least 6 characters' : ''}
        />

      <p></p>
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
      />
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input 
          type='checkbox'  
          onChange={handleCheckboxChange} 
          checked={role === 'ADMIN'}
        />
        <p>Sign up as Admin</p>
      </div>
     
      
      <Button
       variant="outlined"
       sx={{ mt: 1 }}
       onClick={handleRegister}>Sign Up</Button>
      <Button
       variant="outlined"
    
       sx={{ mt: 1 }}
       onClick={() => {navigate('/login')}}>Go to Sign In</Button>
    </Box>
    </Container>
  );
}

export default RegistrationPage;
