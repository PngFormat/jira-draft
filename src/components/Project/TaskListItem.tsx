import React, { useEffect, useState } from 'react';
import styles from '../Project/Project.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import {loginUser} from '../../redux/auth/authActions';
import { AppDispatch } from '../../redux/store';
import { IProject } from '../../interfaces';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';
import { deleteProjects } from '../../redux/projectRedux/projectActions';
import { fetchProjects } from '../../redux/projectRedux/projectActions';
import TaskStatus from '../TaskStatus';
import TaskType from '../TaskType';
import { ITask } from '../../interfaces';
import TaskUser from '../TaskUser';
import { RootState } from '../../redux/store';
import { taskInfoSelector } from '../../redux/store/selectors/taskSelectors';

export const TaskListItem: React.FC<ITask> = ({ id, 
    title, 
    description, 
    onClick, 
    timeTracked, 
    timeAllotted, 
    projectId, 
    statusId, 
    typeId, 
    userId, 
    status, 
    user, 
    type,
    files }) => {
    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate();
    const taskInfo = useSelector((state: RootState) => taskInfoSelector(id)(state));

    const handleNavigateToEditTask = (taskId: number) => {
      
      if (!taskId || !projectId) {
          console.error('Task ID or Project ID is missing.');
          return;
      };

      navigate(`/projects/${projectId}/tasks/edit/${taskId}`);
  };
    const handleDeleteTask = (id:number | undefined) => {
        if (!id) {
            console.error('Project ID is undefined.');
            return;
        }
        

        if (window.confirm("Are you sure you want to delete this project?")) {
            dispatch(fetchProjects());
        }
    }
    return (
        <div className={styles.container} onClick={onClick}>
        <div className={styles.content}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
          
          <div className={styles.blockInfo}>
            <div className={styles.additionalInfoItem}>
              <TaskStatus status={status} />
            </div>

            <div className={styles.additionalInfoItem}>
              <TaskType type={type} />
            </div>
            <div className={styles.additionalInfoItem}>
              <TaskUser user={user} />
            </div>
          </div>
        </div>
        <div className={styles.actionsContainer}>
            <EditIcon
                    className={styles.actionIcon}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleNavigateToEditTask(id);
                    }}
                />
          <DeleteIcon 
            className={styles.actionIcon} 
            onClick={() => handleDeleteTask(id)} 
          />
        </div>
      </div>
    )
}