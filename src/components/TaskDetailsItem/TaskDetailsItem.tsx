import React, { useEffect, useState } from 'react';
import styles from './TaskDetailsItem.module.css'
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
import { fetchTasks } from '../../redux/tasks/taskActions';

export const TaskDetailsItem: React.FC<ITask> = ({ 
    id, 
    title, 
    description, 
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
    const handleEditComment = (id:number| undefined) => {
        if (!id) {
            console.error('Project ID is undefined.');
            return;
        }
          
           console.log(`Editing project: ${id}`);
    };
    const handleDeleteComment = (id:number | undefined) => {
        if (!id) {
            console.error('Project ID is undefined.');
            return;
        }
        

        if (window.confirm("Are you sure you want to delete this project?")) {
            dispatch(fetchProjects());
        }
    }
    return (
        <div className={styles.container}>
          
        <div className={styles.content}>
          <span className={styles.description}>{description}</span>
          <span className={styles.description}>{id}</span>

          
          <div className={styles.blockInfo}>
            <div className={styles.additionalInfoItem}>
                {status ? <TaskStatus status={status} /> : <p>Status not available</p>}</div>

            <div className={styles.additionalInfoItem}>
            {type ? <TaskType type={type} /> : <p>Type not available</p>}
            </div>
            <div className={styles.additionalInfoItem}>
              <TaskUser user={user} />
            </div>
          </div>
        </div>
        <div className={styles.actionsContainer}>
          <EditIcon 
            className={styles.actionIcon} 
            onClick={() => handleEditComment(id)} 
          />
          <DeleteIcon 
            className={styles.actionIcon} 
            onClick={() => handleDeleteComment(id)} 
          />
        </div>
        
      </div>
    )
}