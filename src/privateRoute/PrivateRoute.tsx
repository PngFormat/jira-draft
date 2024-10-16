import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';

export const PrivateRoute = ({children}: {children: JSX.Element}) => {
    const isAuthenticated = useSelector((state: RootState)=> state.auth.token)

    return isAuthenticated ? children : <Navigate to='/login'/>
}

export default PrivateRoute;