import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button,Box } from '@mui/material';
import { AppDispatch,RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import styles from './ProjectDetailsPage.module.css'
import { fetchTasks } from '../../redux/tasks/taskActions';

interface Task {
  id: string;
  title: string;
  description: string;
}


export const ProjectDetailsPage: React.FC = () => {

    const {id} = useParams<{id:string}>();
    const dispatch:AppDispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state: any) => state.tasks);

    // const taskArray = tasks?.tasks || tasks;
    // console.log(taskArray)

    useEffect(() => {
      if (id) {
          dispatch(fetchTasks(id));
      }
  }, [dispatch, id]);

  const taskArray = tasks?.tasks || []

  console.log("Tasks in component:", tasks);



    return (
           <div className={styles.container}>
            <h1>Project Details</h1>
        <div className={styles.content}>
          <div className={styles.buttonsContainer}>
            <span>{id}</span>
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
                        <div key={task.id || index} className={styles.taskContainer}>
                            <h2>{task.title}</h2>
                            <p>{task.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No tasks available for this project.</p>
                )}
        </div>
      </div>
    )
}