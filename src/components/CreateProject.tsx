import React, { useState } from 'react';
import { Container, Typography, Button,Box, TextField } from '@mui/material';

export const CreateProject = () => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>

            <Typography variant='h4'>Create new Project</Typography>
            <TextField
             label="Title"
             variant="outlined"
             margin="normal"
             value={title}
          
            >
               
            </TextField>
            <TextField
              label="Desctiption"
              variant="outlined"
              margin="normal"
              value={description}
            >
                
            </TextField>
            <Button 
              variant="contained"
              sx={{ mt: 1, width: '220px' }}
            >
              Create
            </Button>
            </Box>
        </Container>
    );
}

export default CreateProject;
