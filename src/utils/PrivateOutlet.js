import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as ROUTES from '../constants/routes';

function PrivateOutlet() {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to={ROUTES.HOME} />;
}

export default PrivateOutlet;
