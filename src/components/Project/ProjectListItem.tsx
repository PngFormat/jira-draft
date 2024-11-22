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


export const ProjectComponent: React.FC<IProject> = ({id,title,description,onClick}) => {
    const dispatch:AppDispatch = useDispatch();

    const handleEditProject = (id:string) => {
        if (!id) {
            console.error('Project ID is undefined.');
            return;
        }
          
           console.log(`Editing project: ${id}`);
    };


    const handleDeleteProject = (id: number) => {
        if (!id) {
            console.error('Project ID is undefined.');
            return;
        }
        

        if (window.confirm("Are you sure you want to delete this project?")) {
            dispatch(deleteProjects(id));
            dispatch(fetchProjects());
        }
    }
    
    return(
        <div className={styles.container} onClick={onClick}>
            <div className={styles.content}>
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>{description}</span>
            <div className={styles.additionalInfo}>
                {/* <span className={styles.taskCount}>Task Count: {project.tasksCount}</span>
                <span className={styles.userCount}>Members: {project.users.length}</span> */}
            </div>
            </div>
            <div className={styles.actionsContainer}>
                
            <EditIcon className={styles.actionIcon}
            onClick={() => handleEditProject(String(id))}
            />
            <DeleteIcon className={styles.actionIcon}
            onClick={() => handleDeleteProject(Number(id))}/>
            </div>
        </div>
    )
}