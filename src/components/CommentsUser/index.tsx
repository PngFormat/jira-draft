import React, { useEffect, useState } from 'react';
import styles from '../Project/Project.module.css'
import { useDispatch, useSelector } from 'react-redux';

import {loginUser} from '../../redux/auth/authActions';
import { AppDispatch } from '../../redux/store';
import { IComment, IProject } from '../../interfaces';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';
import { deleteProjects } from '../../redux/projectRedux/projectActions';
import { fetchProjects } from '../../redux/projectRedux/projectActions';
import TaskStatus from '../TaskStatus';
import TaskType from '../TaskType';
import { ITask } from '../../interfaces';
import TaskUser from '../TaskUser';
import { fetchComments } from '../../redux/comments/commentActions';
import { loadavg } from 'os';
import { RootState } from '../../redux/store';

export const CommentUser: React.FC<IComment> = ({ 
    id, 
  taskId,
    message,
    userId, 
    user, 
    files }) => {
    const dispatch:AppDispatch = useDispatch();
    const { comments, loading, error } = useSelector((state: RootState) => state.comments);
    

    const handleEdiComment = (id:number| undefined) => {
        if (!id) {
            console.error('Comments ID is undefined.');
            return;
        }
          
           console.log(`Editing project: ${id}`);
    };
    const handleDeleteComment = (id:number | undefined) => {
        if (!id) {
            console.error('Edit ID is undefined.');
            return;
        }
        

        if (window.confirm("Are you sure you want to edit this project?")) {
          console.log(`Deleting comment: ${id}`);
        }
    }

 

    if(loading) return <div>Loading comments...</div>
    if (error) return <p>Error: {error}</p>;

    return (
      <div className={styles.container}>
      <div className={styles.content}>
          <span className={styles.title}>Comment by {user.name}</span>
          <span className={styles.description}>{message}</span>

          <div className={styles.blockInfo}>
              <div className={styles.additionalInfoItem}>
                  <TaskUser user={user} />
              </div>
          </div>
      </div>
      <div className={styles.actionsContainer}>
          <EditIcon 
              className={styles.actionIcon} 
              onClick={() => handleEdiComment(id)} 
          />
          <DeleteIcon 
              className={styles.actionIcon} 
              onClick={() => handleDeleteComment(id)} 
          />
      </div>
  </div>
    )
}