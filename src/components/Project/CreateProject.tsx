import React, { useState } from 'react';
import { Container, Typography, Button, Box, TextField, Snackbar } from '@mui/material';
import { CreateProjectProps } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { createProject } from '../../redux/projectRedux/projectActions';

export const CreateProject: React.FC<CreateProjectProps> = ({ handleCreate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const onSubmit = async () => {
        if (!title || !description) {
            setError('Please fill in both fields');
            return;
        }

        setLoading(true);
        try {
            await dispatch(createProject({ title, description })).unwrap();
            setSuccess(true);
            navigate('/projects');
        } catch (err) {
            setError('Failed to create project. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setError('');
        setSuccess(false);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                <Typography variant='h4'>Create New Project</Typography>
                <TextField
                    label="Title"
                    variant="outlined"
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Description" 
                    variant="outlined"
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{ mt: 1, width: '220px' }}
                    onClick={onSubmit}
                    disabled={loading}  
                >
                    {loading ? 'Creating...' : 'Create'}
                </Button>
            </Box>
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={error}
            />
            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Project created successfully!"
            />
        </Container>
    );
};

export default CreateProject;
