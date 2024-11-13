import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteForeverSharp';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { IUser } from '../../../interfaces';
import UsersInProjectList from './UsersInProjectList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabContent = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`users-tabpanel-${index}`}
      aria-labelledby={`users-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

interface IProps {
  usersInProject: IUser[];
  usersOutsideProject: IUser[];
  addUserToProject: (selectedUser: IUser) => void;
  removeUserFromProject: (selectedUser: IUser) => void;
}

export default function UsersTabs({
  usersInProject,
  usersOutsideProject,
  addUserToProject,
  removeUserFromProject,
}: IProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="users-tabs">
          <Tab
            label="Users In Project"
            id="users-tab-1"
            aria-controls="users-tabpanel-1"
          />
          <Tab
            label="Users Outside Project"
            id="users-tab-2"
            aria-controls="users-tabpanel-2"
          />
        </Tabs>
      </div>
      <TabContent value={value} index={0}>
        <UsersInProjectList
          users={usersInProject}
          onClick={removeUserFromProject}
          Icon={DeleteIcon}
        />
      </TabContent>
      <TabContent value={value} index={1}>
        <UsersInProjectList
          users={usersOutsideProject}
          onClick={addUserToProject}
          Icon={AddIcon}
        />
      </TabContent>
    </div>
  );
}