import React from 'react';
import { Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useProjects from '../../hooks/useProjects';
import { projectInfoSelector } from '../../redux/store/selectors/projectSelectors';
import { RootState } from '../../redux/store';
import { IProject } from '../../interfaces';
import styles from './ProjectEditorPage.module.css';

const ProjectEditorPage: React.FC<{
  projectId: number;
  currentTitle: string;
  currentDescription: string;
  updateExistingProject: (projectId: number, title: string, description: string, onSuccess: () => void) => void;
  loading: boolean;
  goBack: () => void;
}> = ({ projectId, currentTitle, currentDescription, updateExistingProject, loading, goBack }) => {
  const [title, setTitle] = React.useState(currentTitle);
  const [description, setDescription] = React.useState(currentDescription);

  const handleUpdate = React.useCallback(() => {
    updateExistingProject(projectId, title, description, goBack);
  }, [projectId, title, description, updateExistingProject, goBack]);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Update Project</span>
      <div className={styles.content}>
        <TextField
          className={styles.textField}
          label="Title"
          variant="filled"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-label="Project Title"
        />
        <TextField
          className={styles.textField}
          label="Description"
          variant="filled"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          aria-label="Project Description"
        />
        <Button
          onClick={handleUpdate}
          className={styles.button}
          variant="contained"
          disabled={loading}
        >
          Update Project
        </Button>
      </div>
    </div>
  );
};

const ProjectEditorHOC: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  console.log(projectId)

  const { loading, updateExistingProject } = useProjects();
  const { getProjectById } = useProjects();
  const [projectInfo, setProjectInfo] = React.useState<IProject | null>(null);
  
  React.useEffect(() => {
    
    const project = getProjectById(projectId);
    console.log('Project by ID:', project);  
  
    if (project) {
      setProjectInfo(project);  
    } else {
      console.log('Project not found');
    }
  }, [projectId, getProjectById]);
  
  if (!projectInfo) {
    return <div>Project not found</div>;
  }

  const adaptUpdateProject = (
    projectId: number,
    title: string,
    description: string,
    onSuccess: () => void
  ) => {
    updateExistingProject(projectId, { title, description }, onSuccess);
  };
  

  return (
    <ProjectEditorPage
      projectId={projectInfo.id || 0}
      currentTitle={projectInfo.title}
      currentDescription={projectInfo.description}
      updateExistingProject={adaptUpdateProject}
      loading={loading}
      goBack={() => navigate(-1)}
    />
  );
};

export default ProjectEditorHOC;
