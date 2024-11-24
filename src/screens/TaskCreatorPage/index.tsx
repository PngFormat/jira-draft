import React, { useState } from 'react';
import { Container, Typography, Button, Box, TextField, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { projectInfoSelector } from '../../redux/store/selectors/projectSelectors';
import { IType,IStatus,IUser } from '../../interfaces';
import styles from './TaskCreatorPage.module.css'
import FilePicker from '../../components/pickers/FilePicker';
import TypePicker from '../../components/pickers/TypePicker';
import StatusPicker from '../../components/pickers/StatusPicker';
import TaskUserPicker from '../../components/pickers/TaskUserPicker';
import { IProject } from '../../interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { createTasks } from '../../redux/tasks/taskActions';

export const TaskCreatorPage: React.FC = () => {
    const { projectId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const projectInfo = useSelector<RootState, IProject | undefined>(
      (state: RootState) => projectInfoSelector(parseInt(projectId!))(state)
    );


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

    console.log("Props Project ID:", id);




    const addFile = React.useCallback(
        (file: File) => {
          setFiles((uploadedFiles: File[]) => {
            const isSelectedFile = files.some(
              (uploadedFile: File) => uploadedFile.name === file.name
            );
            if (isSelectedFile) {
              alert('You have already selected a file with this name');
              return uploadedFiles;
            }
            return [...uploadedFiles, file];
          });
        },
        [files]
    );

 

    

    const createNewTask = async () => {
      try {
        const projectId = id;
        if (!projectId) {
          console.error("Project ID is missing or invalid");
          return;
        }
        const taskPayload = {
          task: {
            title: title,
            description : description,
            statusId: status?.id || 0,
            typeId: type?.id || 0,
            userId: user?.id || 0,
            timeAllotted: timeAllotted || 0,
          },
          projectId,
        };
        navigate(`/projects/${projectId}`)
        await dispatch(createTasks(taskPayload));
      } catch (error) {
        console.error("Error creating task:", error);
      }
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
                usersInProject={projectInfo?.users ?? []} 
                user={user}
                setUser={setUser}
              />
            </div>
          </div>
  
          <span className={styles.fileListTitle}>New Files</span>
          <div className={styles.fileList}>
            {/* <NewFileList files={files} deleteFile={deleteFile} /> */}
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
