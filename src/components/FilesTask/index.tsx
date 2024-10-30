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
import { IFile } from '../../interfaces';

export const FilesTask: React.FC<IFile> = ({id,name}) => {
    const dispatch:AppDispatch = useDispatch();

    const handleDeleteFile = (id:number | undefined) => {
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

          
          <div className={styles.blockInfo}>
        
          </div>
        </div>
        <div className={styles.actionsContainer}>
         
          <DeleteIcon 
            className={styles.actionIcon} 
            onClick={() => handleDeleteFile(id)} 
          />
        </div>
      </div>
    )
}