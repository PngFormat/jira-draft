import { IStatus } from '../../interfaces';
import styles from './TaskStatus.module.css';

interface IProps {
  status: IStatus;
}

const TaskStatus = ({ status }: IProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{status.title}</span>
    </div>
  );
};

export default TaskStatus;