import useUsers from '../../../hooks/useUsers';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import React from 'react';
import { IUser } from '../../../interfaces';
import TaskUser from '../../TaskUser';
import styles from './TaskUserPickerModal.module.css';
import fetchUsers from '../../../redux/users/userActions';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

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

  const dispatch: AppDispatch = useDispatch();
  const { users } = useSelector((state: any) => state.users); 
  const usersArray = users?.users || []
  console.log(usersArray)

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <Dialog onClose={closeModal} open={true}>
      <div className={styles.container}>
        <span className={styles.title}>Select User</span>
        <div className={styles.content}>
          <div>
            {usersArray.map((userItem: IUser) => (
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