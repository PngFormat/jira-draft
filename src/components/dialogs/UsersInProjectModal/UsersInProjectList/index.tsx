import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { IUser } from '../../../../interfaces';
import UserInProject from '../../../UsersInProject';
import styles from './UsersInProjectList.module.css';

export interface IProps {
  users: IUser[];
  onClick: (user: IUser) => void;
  Icon: OverridableComponent<SvgIconTypeMap>;
}

const UsersInProjectList = ({ users, onClick, Icon }: IProps) => {
  return (
    <div className={styles.container}>
      {users.map((user: IUser) => (
        <UserInProject
          key={user.id}
          user={user}
          onClick={onClick}
          Icon={Icon}
        />
      ))}
    </div>
  );
};

export default UsersInProjectList;