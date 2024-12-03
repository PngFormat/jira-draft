import { IFile } from '../../interfaces';
import DeleteIcon from '@mui/icons-material/DeleteForeverSharp';
import React from 'react';
import styles from './UploadedFile.module.css';

interface IProps {
  file: IFile;
  deleteFile: (file: IFile) => void;
}

const UploadedFile = ({ file, deleteFile }: IProps) => {
  const deleteCurrentFile = React.useCallback(() => {
    deleteFile(file);
  }, [file]);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={file.name} />
      <div onClick={deleteCurrentFile} className={styles.deleteIcon}>
        <DeleteIcon color="error" />
      </div>
    </div>
  );
};

export default UploadedFile;