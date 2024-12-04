import NewFileList from '../../components/lists/NewFileList';
import UploadedFileList from '../../components/lists/UploadedFileList';
import FilePicker from '../../components/pickers/FilePicker';
import StatusPicker from '../../components/pickers/StatusPicker';
import TaskUserPicker from '../../components/pickers/TaskUserPicker';
import TypePicker from '../../components/pickers/TypePicker';
import useTasks from '../../hooks/useTasks';
import { IFile, IProject, IStatus, ITask, IType, IUser } from '../../interfaces';
import { Button, TextField } from '@mui/material';
import { projectInfoSelector } from '../../redux/store/selectors/projectSelectors';
import { taskInfoSelector } from '../../redux/store/selectors/taskSelectors';
import { AppDispatch, RootState } from '../../redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './TaskEditorPage.module.css';
import { UseDispatch } from 'react-redux';

interface IProps {
  projectId: number;
  taskId: number;
  currentTitle: string;
  currentDescription: string;
  currentTimeAllotted: number;
  currentType: IType;
  currentStatus: IStatus;
  currentUser: IUser;
  currentFiles: IFile[];
  projectInfo?: IProject;
}

const TaskEditorPage = ({
  projectId,
  taskId,
  currentTitle,
  currentDescription,
  currentTimeAllotted,
  currentType,
  currentStatus,
  currentUser,
  currentFiles,
  projectInfo,
  
}: IProps) => {

  const [title, setTitle] = React.useState<string>(currentTitle);
  const [description, setDescription] =
    React.useState<string>(currentDescription);
  const [timeAllotted, setTimeAllotted] =
    React.useState<number>(currentTimeAllotted);
  const [type, setType] = React.useState<IType | undefined>(currentType);
  const [status, setStatus] = React.useState<IStatus | undefined>(
    currentStatus
  );
  const [user, setUser] = React.useState<IUser | undefined>(currentUser);
  const [files, setFiles] = React.useState<File[]>([]);
  const [oldFiles, setOldFiles] = React.useState<IFile[]>(currentFiles);
  const dispatch:AppDispatch = useDispatch();
  const { loading, updateTask } = useTasks(projectId);

  const navigate = useNavigate();

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

  const deleteFile = React.useCallback(
    (file: File) => {
      setFiles((uploadedFiles: File[]) =>
        uploadedFiles.filter(
          (uploadedFile: File) => uploadedFile.name !== file.name
        )
      );
    },
    [files]
  );

  const deleteOldFile = React.useCallback(
    (file: IFile) => {
      setOldFiles((uploadedFiles: IFile[]) =>
        uploadedFiles.filter(
          (uploadedFile: IFile) => uploadedFile.name !== file.name
        )
      );
    },
    [oldFiles]
  );

  const updateCurrentTask = React.useCallback(() => {
    if (status && type && user) {
      
      const updatedTaskPayload = {
        taskId: taskId,
        projectId: projectId, 
        updatedTask: {
          title: title,
          description: description,
          statusId: status.id, 
          typeId: type.id, 
          userId: user.id,
          timeAllotted: timeAllotted,
        },
      };
  
      dispatch(updateTask(updatedTaskPayload)).then(() => {
        if (goToProjectDetails) {
          goToProjectDetails(); // Call the goToProjectDetails function after the task update
        }
      });
    }
  }, [
    taskId,
    title,
    description,
    timeAllotted,
    type,
    status,
    user,
    files,
    oldFiles,
    dispatch,
  ]);
  
  

  const goToProjectDetails = React.useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Update Current Task</span>
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
              usersInProject={projectInfo!.users || []}
              user={user}
              setUser={setUser}
            />
          </div>
        </div>
        <span className={styles.fileListTitle}>Uploaded Files</span>
        <div className={styles.fileList}>
          <UploadedFileList files={oldFiles} deleteFile={deleteOldFile} />
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
          onClick={updateCurrentTask}
          className={styles.button}
          variant="contained"
          disabled={loading}
        >
          Update Current Task
        </Button>
      </div>
    </div>
  );
};

const TaskGroupEditorHOC: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log('id task', id)
  const navigate = useNavigate();
  const { getTaskById, loading, updateExistingTask } = useTasks();
  const { projects } = useSelector((state:any) => state.projects.projects);
  const projectInfo = projects.find((project: IProject) => project.id === project.id);

  const [taskInfo, setTaskInfo] = React.useState<ITask | null>(null);
  const task = getTaskById(id);
  console.log('Task by ID:', task);  
  React.useEffect(() => {
    if (task) {
      setTaskInfo(task);
    } else {
      console.error('Task not found');
    }
  }, [id, getTaskById]);

  if (!taskInfo) {
    return <div>Loading...</div>;
  }

  return (
    <TaskEditorPage
      projectId={taskInfo.projectId}
      taskId={taskInfo.id}
      currentTitle={taskInfo.title}
      currentDescription={taskInfo.description}
      currentTimeAllotted={taskInfo.timeAllotted}
      currentType={taskInfo.type}
      currentStatus={taskInfo.status}
      currentUser={taskInfo.user}
      currentFiles={taskInfo.files}
      projectInfo={projectInfo}
    />
  );
};

export default TaskGroupEditorHOC;
