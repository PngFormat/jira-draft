import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { AppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import styles from './TaskDetail.module.css';
import { fetchTasks } from '../../redux/tasks/taskActions';
import { fetchComments } from '../../redux/comments/commentActions';
import { TaskDetailsItem } from '../../components/TaskDetailsItem/TaskDetailsItem';
import { CommentUser } from '../../components/CommentsUser';
import useTasks from '../../hooks/useTasks';

const TaskDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();

  const { tasks, loading, error } = useSelector((state: any) => state.tasks);
  const { comments } = useSelector((state: any) => state.comments);

  const { getTaskById } = useTasks();
  const task = getTaskById(id);
  console.log(task)

  const commentsArray = comments?.comments || [];

  const deleteCurrentTask = React.useCallback(() => {
    // Implement task delete logic here
  }, []);

  const goToTaskEditor = React.useCallback(() => {
    navigate(`/projects/1/tasks/edit/${id}`);
  }, [id]);

  const goToCommentEditor = React.useCallback(() => {
    navigate(`/projects/1/tasks/${id}/comments/create`);
  }, [id]);

  return (
    <div className={styles.container}>
      <span className={styles.title}>{task?.title || 'Task Details'}</span>
      <div className={styles.content}>
        <div className={styles.buttonsContainer}>
          <Button onClick={goToCommentEditor} className={styles.button} variant="contained">
            Create Comment
          </Button>
          <Button onClick={goToTaskEditor} className={styles.button} variant="contained">
            Edit Task
          </Button>
          <Button onClick={deleteCurrentTask} className={styles.button} variant="outlined" color="error">
            Delete Task
          </Button>
        </div>
        <div className={styles.additionalInfo}>
          {loading ? (
            <p>Loading details...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>Error: {error}</p>
          ) : task ? (
            <TaskDetailsItem
              id={task.id}
              title={task.title}
              description={task.description}
              timeTracked={task.timeTracked}
              timeAllotted={task.timeAllotted}
              projectId={task.projectId}
              statusId={task.statusId}
              typeId={task.typeId}
              userId={task.userId}
              status={task.status}
              user={task.user || null}
              type={task.type}
              files={task.files || undefined}
            />
          ) : (
            <p>Task not found</p>
          )}
        </div>
        <span className={styles.commentListTitle}>Comments:</span>
        <div className={styles.commentList}>
          {commentsArray.length > 0 ? (
            commentsArray.map((comment:any) => (
              <CommentUser
                key={comment.id}
                id={comment.id}
                taskId={comment.taskId}
                message={comment.message}
                userId={comment.userId}
                user={comment.user}
                files={comment.files}
              />
            ))
          ) : (
            <p>No comments available for this task.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
