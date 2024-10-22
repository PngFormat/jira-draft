import React, { useEffect, useState } from 'react';
import styles from '../Project/Project.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import {loginUser} from '../../redux/authActions';
import { AppDispatch } from '../../redux/store';
import { IProject } from '../../interfaces';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';


export const ProjectComponent: React.FC<IProject> = ({title,description}) => {
    
    return(
        <div className={styles.container}>
            <div className={styles.content}>
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>{description}</span>
            <div className={styles.additionalInfo}>
                {/* <span className={styles.taskCount}>Task Count: {project.tasksCount}</span>
                <span className={styles.userCount}>Members: {project.users.length}</span> */}
            </div>
            </div>
            <div className={styles.actionsContainer}>
            <EditIcon className={styles.actionIcon}/>
            <DeleteIcon className={styles.actionIcon}/>
            </div>
        </div>
    )
}