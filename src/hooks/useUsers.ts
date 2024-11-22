import fetchUsers from '../redux/users/userActions';
import { IUser } from '../interfaces';
import { AppDispatch, RootState } from '../redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useUsers = () => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const users = useSelector<RootState, any>(
    (state: RootState) => state.users.users
  );

  const error = useSelector<RootState, any>(
    (state: RootState) => state.users.error
  );

  const loading = useSelector<RootState, boolean>(
    (state: RootState) => state.users.loading
  );

  const fetchUsersData = React.useCallback(() => {
    dispatch(fetchUsers()); 
  }, [dispatch]);


  return { users, error, loading, fetchUsers: fetchUsersData };
};

export default useUsers;