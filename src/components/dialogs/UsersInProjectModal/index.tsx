import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchTypes from '../../../redux/types/typeActions';
import { IType,IUser } from '../../../interfaces';
import TaskType from '../../TaskType';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import styles from './TypePickerModal.module.css';
import { AppDispatch, RootState } from '../../../redux/store';
import UsersTabs from './UserTabs';

export interface IProps {
    usersInProject: IUser[];
    usersOutsideProject: IUser[];
    addUserToProject: (selectedUser: IUser) => void;
    removeUserFromProject: (selectedUser: IUser) => void;
    closeModal: () => void;
  }

  const UsersInProjectModal = ({
    usersInProject,
    usersOutsideProject,
    addUserToProject,
    removeUserFromProject,
    closeModal,
  }: IProps) => {
  
  return (
    <Dialog onClose={closeModal} open={true}>
      <div className={styles.container}>
        <span className={styles.title}>Users</span>
        <div className={styles.content}>
          <UsersTabs
            usersInProject={usersInProject}
            usersOutsideProject={usersOutsideProject}
            addUserToProject={addUserToProject}
            removeUserFromProject={removeUserFromProject}
          />
          <Button
            onClick={closeModal}
            className={styles.button}
            variant="contained"
          >
            Close
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default UsersInProjectModal;
