import React, { useState } from 'react';
import { Container, Typography, Button, Box, TextField, Snackbar } from '@mui/material';
import { CreateProjectProps } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { createProject, fetchProjects } from '../../redux/projectRedux/projectActions';
import { useParams } from 'react-router-dom';
import { IType,IStatus,IUser } from '../../interfaces';
import styles from './TaskCreatorPage.module.css'

export const TaskCreatorPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);


    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [timeAllotted, setTimeAllotted] = React.useState<number>(0);
    const [type, setType] = React.useState<IType | undefined>();
    const [status, setStatus] = React.useState<IStatus | undefined>();
    const [user, setUser] = React.useState<IUser | undefined>();
    const [files, setFiles] = React.useState<File[]>([]);
    
    const navigate= useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const { id } = useParams<{ id: string }>();

    const onSubmit = async () => {
        if (!title || !description) {
            setError('Please fill in both fields');
            return;
        }

        setLoading(true);
        try {
          const newProject = { title, description };
          await dispatch(createProject(newProject)).unwrap();
  
          const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]') || [];
          localStorage.setItem('projects', JSON.stringify([...existingProjects, newProject]));
  
          setSuccess(true);
          navigate('/projects');
        } catch (err: any) {
            console.error('Error creating project:', err);
            setError(err.response?.data?.message || 'Failed to create project. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setError('');
        setSuccess(false);
    };

    return (
        <div className={styles.container}>
        <span className={styles.title}>Create New Task</span>
        <div className={styles.content}>
          <TextField
            className={styles.textField}
            label="Title"
            variant="filled"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            className={styles.textField}
            label="Desription"
            variant="filled"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <TextField
            className={styles.textField}
            label="Time Allotted (minutes)"
            variant="filled"
            type="number"
            value={timeAllotted}
            onChange={(event) => {
              const value = event.target.value;
              if (value === '') {
                setTimeAllotted(0);
              } else if (/^\d+$/.test(value)) {
                setTimeAllotted(Number(value));
              }
            }}
          />
          <div className={styles.additionalInfo}>
            <div className={styles.additionalInfoItem}>
              <span className={styles.additionalInfoItemTitle}>Type:</span>
              <TypePicker type={type} setType={setType} />
            </div>
            <div className={styles.additionalInfoItem}>
              <span className={styles.additionalInfoItemTitle}>Status:</span>
              <StatusPicker status={status} setStatus={setStatus} />
            </div>
            <div className={styles.additionalInfoItem}>
              <span className={styles.additionalInfoItemTitle}>User:</span>
              <TaskUserPicker
                usersInProject={projectInfo!.users}
                user={user}
                setUser={setUser}
              />
            </div>
          </div>
  
          <span className={styles.fileListTitle}>New Files</span>
          <div className={styles.fileList}>
            <NewFileList files={files} deleteFile={deleteFile} />
          </div>
          <FilePicker setFile={addFile}>
            <Button className={styles.buttonAddFile} variant="contained">
              Add File
            </Button>
          </FilePicker>
          <Button
            onClick={createNewTask}
            className={styles.button}
            variant="contained"
            disabled={loading}
          >
            Create New Task
          </Button>
        </div>
      </div>
    );
};

export default TaskCreatorPage;
