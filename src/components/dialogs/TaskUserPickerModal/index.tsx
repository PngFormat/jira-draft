import useUsers from '../../../hooks/useUsers';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import React from 'react';
import { IUser } from '../../../interfaces';
import TaskUser from '../../TaskUser';
import styles from './TaskUserPickerModal.module.css';

export interface IProps {
  usersInProject: IUser[];
  selectUser: (selectedUser: IUser) => void;
  closeModal: () => void;
}

const TaskUserPickerModal = ({
  usersInProject,
  selectUser,
  closeModal,
}: IProps) => {
  const { fetchUsers } = useUsers();

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Dialog onClose={closeModal} open={true}>
      <div className={styles.container}>
        <span className={styles.title}>Select User</span>
        <div className={styles.content}>
          <div>
            {usersInProject.map((userItem: IUser) => (
              <div
                key={userItem.id}
                className={styles.userContainer}
                onClick={() => selectUser(userItem)}
              >
                <TaskUser user={userItem} />
              </div>
            ))}
          </div>
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

export default TaskUserPickerModal;