import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button,Box } from '@mui/material';
import { AppDispatch,RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import styles from './ProjectDetailsPage.module.css'
import { fetchTasks } from '../../redux/tasks/taskActions';
import { TaskListItem } from '../../components/Project/TaskListItem';

export const ProjectDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams<{id:string}>();
    const dispatch:AppDispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state: any) => state.tasks);

    useEffect(() => {
      if (id) {
        dispatch(fetchTasks(id));
      }
  }, [dispatch, id]);

  const handleNavigateTaskDetails = (id:number) => {
    navigate(`/projects/${id}/tasks`)
    console.log('Project clicked:', id);
  }

  const taskArray = tasks?.tasks || []

    return (
           <div className={styles.container}>
            <h1>Project Details</h1>
        <div className={styles.content}>
          <div className={styles.buttonsContainer}>
            <Button variant="contained">Create Task</Button>
            <Button variant="contained">Edit Project</Button>
            <Button variant="outlined" color='error'>Delete Project</Button>
            </div>
           
            {loading ? (
                    <p>Loading tasks...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>Error: {error}</p>
                ) : taskArray.length > 0 ? (
                    taskArray.map((task: any, index: number) => (
                        <div key={task.id || index}>
                           <TaskListItem 
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            onClick={() => {handleNavigateTaskDetails(task.id) }}
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

                            </div>
                    ))
                ) : (
                    <p>No tasks available for this project.</p>
                )}
                </div>
        </div>
      
    )
}