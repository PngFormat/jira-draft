import DeleteIcon from '@mui/icons-material/DeleteForeverSharp';
import { IFile } from '../../interfaces';
import styles from './AttachedFile.module.css';

interface IProps {
  file: IFile;
}

const AttachedFile = ({ file }: IProps) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={file.name} />
      <DeleteIcon color="error" className={styles.deleteIcon} />
    </div>
  );
};

export default AttachedFile;