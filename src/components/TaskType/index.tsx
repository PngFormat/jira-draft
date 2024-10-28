import { IType } from '../../interfaces';
import styles from './TaskType.module.css'

interface IProps {
  type: IType;
}

const TaskType = ({ type }: IProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{type.title}</span>
    </div>
  );
};

export default TaskType;