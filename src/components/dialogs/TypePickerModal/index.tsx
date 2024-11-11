import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchTypes from '../../../redux/types/typeActions';
import { IType } from '../../../interfaces';
import TaskType from '../../TaskType';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import styles from './TypePickerModal.module.css';
import { AppDispatch } from '../../../redux/store';

export interface IProps {
  selectType: (selectedType: IType) => void;
  closeModal: () => void;
}

const TypePickerModal = ({ selectType, closeModal }: IProps) => {
  const dispatch:AppDispatch = useDispatch();
  const { types, loading, error } = useSelector((state: any) => state.types);

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Dialog onClose={closeModal} open={true}>
      <div className={styles.container}>
        <span className={styles.title}>Select Type</span>
        <div className={styles.content}>
          <div>
            {types.map((typeItem: IType) => (
              <div
                key={typeItem.id}
                className={styles.typeContainer}
                onClick={() => selectType(typeItem)}
              >
                <TaskType type={typeItem} />
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

export default TypePickerModal;
