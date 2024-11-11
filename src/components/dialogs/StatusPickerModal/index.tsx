import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStatus } from '../../../interfaces';
import TaskType from '../../TaskType';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import styles from '../TypePickerModal/TypePickerModal.module.css';
import { AppDispatch, RootState } from '../../../redux/store';
import fetchStatuses from '../../../redux/statuses/statusActions';

export interface IProps {
  selectStatus: (selectedStatus: IStatus) => void;
  closeModal: () => void;
}

const StatusPickerModal = ({ selectStatus, closeModal }: IProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { statuses, loading, error } = useSelector((state: any) => state.statuses);

  useEffect(() => {
    dispatch(fetchStatuses());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const statusesArray = statuses?.statuses || [];

  return (
    <Dialog onClose={closeModal} open={true}>
      <div className={styles.container}>
        <span className={styles.title}>Select Status</span>
        <div className={styles.content}>
          <div>
            {statusesArray.map((statusItem: IStatus) => (
              <div
                key={statusItem.id}
                className={styles.typeContainer}
                onClick={() => selectStatus(statusItem)} 
              >
                <TaskType type={statusItem} />
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

export default StatusPickerModal;
