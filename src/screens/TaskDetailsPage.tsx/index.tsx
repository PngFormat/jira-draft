import { Button } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TaskStatus from '../../components/TaskStatus';
import TaskType from '../../components/TaskType';
import TaskUser from '../../components/TaskUser';
import styles from './TaskDetail.module.css';


const TaskDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteCurrentTask = React.useCallback(() => {}, []);

  const goToTaskEditor = React.useCallback(() => {
    navigate('/projects/1/tasks/edit/1');
  }, []);

  const goToCommentEditor = React.useCallback(() => {
    navigate('/projects/1/tasks/1/comments/create');
  }, []);

  return (
    <div className={styles.container}>
      {/* <span className={styles.title}>{TASK.title}</span> */}
      <div className={styles.content}>
        <div className={styles.buttonsContainer}>
          <Button
            onClick={goToCommentEditor}
            className={styles.button}
            variant="contained"
          >
            Create Comment
          </Button>
          <Button
            onClick={goToTaskEditor}
            className={styles.button}
            variant="contained"
          >
            Edit Task
          </Button>
          <Button
            onClick={deleteCurrentTask}
            className={styles.button}
            variant="outlined"
            color="error"
          >
            Delete Task
          </Button>
        </div>
        {/* <span className={styles.description}>{TASK.description}</span> */}
        <div className={styles.additionalInfo}>
          <div className={styles.additionalInfoItem}>
            {/* <TaskType type={TASK.type} /> */}
          </div>
          <div className={styles.additionalInfoItem}>
            {/* <TaskStatus status={TASK.status} /> */}
          </div>
          <div className={styles.additionalInfoItem}>
            {/* <TaskUser user={TASK.user} /> */}
          </div>
        </div>
        <span className={styles.fileListTitle}>Files:</span>
        <div className={styles.fileList}>
          {/* {TASK.files.map((file: IFile) => (
            <div key={file.id} className={styles.fileContainer}>
              <AttachedFile file={file} />
            </div> */}
          {/* ))} */}
          {/* <AddFileButton addFile={() => {}} /> */}
        </div>
        <span className={styles.commentListTitle}>Comments:</span>
        <div className={styles.commentList}>
          {/* {COMMENTS.map((comment: IComment) => (
            <div key={comment.id} className={styles.commentContainer}>
              <CommentListItem comment={comment} />
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;