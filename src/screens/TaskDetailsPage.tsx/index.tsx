import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button,Box } from '@mui/material';
import { AppDispatch,RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import styles from './TaskDetail.module.css'
import { fetchTasks } from '../../redux/tasks/taskActions';
import { TaskDetailsItem } from '../../components/TaskDetailsItem/TaskDetailsItem';
import AddFileButton from '../../components/AddFileButton';
import { FilesTask } from '../../components/FilesTask';


const TaskDetailsPage = () => {
  const navigate = useNavigate();
    const {id} = useParams<{id:string}>();
    const dispatch:AppDispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state: any) => state.tasks);
    const taskArray = tasks?.tasks || []
    const taskTitle = taskArray.length > 0 ? taskArray[0].title : 'Task Details';


    useEffect(() => {
      if (id) {
          dispatch(fetchTasks(id));
      }
    }, [dispatch, id]);
    

  const deleteCurrentTask = React.useCallback(() => {}, []);

  


  const goToTaskEditor = React.useCallback(() => {
    navigate('/projects/1/tasks/edit/1');
  }, []);

  const goToCommentEditor = React.useCallback(() => {
    navigate('/projects/1/tasks/1/comments/create');
  }, []);

  return (
    <div className={styles.container}>
      <span className={styles.title}>{taskTitle}</span>
      <div></div>
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
        <div className={styles.additionalInfo}>
          <div className={styles.additionalInfoItem}>
          {loading ? (
                    <p>Loading details...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>Error: {error}</p>
                ) : taskArray.length > 0 ? (
                    taskArray.map((task: any, index: number) => (
                        <div key={task.id || index} >
                           <TaskDetailsItem 
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            timeTracked={task.timeTracked}
                            timeAlloted={task.timeAlloted}
                            projectId={task.projectId}
                            statusId={task.statusId}
                            typeId={task.typeId}
                            userId={task.userId}
                            status={task.status}
                            user={task.user || null}  
                            type={task.type}
                            files={task.filests || undefined} 
                          />

                      <div>
                          {task.files.length > 0? (
                          task.files.map((file: any) => (
                            <div className={styles.fileList}>
                              <span className={styles.fileListTitle}>Files:</span>
                              <div className={styles.fileList}>
                                <FilesTask key={file.id} id={file.id} name={file.name} />
                                <AddFileButton addFile={() => {}}/>
                              </div>

                            </div>
                          ))
                        ) : (
                          <p>No files available for this task.</p>
                        )}
                     </div>


                        </div>
                    ))
                ) : (
                    <p>No available description and comments</p>
                )}
          </div>
          
        </div>
        
        
        <div className={styles.fileList}>
       
        </div>
        <span className={styles.commentListTitle}>Comments:</span>
        <div className={styles.commentList}>
        
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;