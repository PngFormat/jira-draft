import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { IUser } from '../../interfaces';
import styles from './UserInProject.module.css';

interface IProps {
  user: IUser;
  onClick: (user: IUser) => void;
  Icon: OverridableComponent<SvgIconTypeMap>;
}

const UserInProject = ({ user, onClick, Icon }: IProps) => {
  return (
    <div className={styles.container}>
      <span>{user.email}</span>
      <div onClick={() => onClick(user)}>
        {<Icon className={styles.icon} />}
      </div>
    </div>
  );
};

export default UserInProject;