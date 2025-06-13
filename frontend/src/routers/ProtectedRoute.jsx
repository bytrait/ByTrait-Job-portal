import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user,authLoading } = useAuth();
  const location = useLocation();
  if (authLoading) return <div><Loader/></div>;


  // Still loading user or auth info
  if (user === null) {

    // Not authenticated
    if (allowedRoles.includes('company')) {
      return <Navigate to="/company/login" state={{ from: location }} replace />;
    } else {
      // Redirect students/admins/TPOs to college login
      window.location.href = 'https://college.bytrait.com/login'; // Adjust if needed
      return null;
    }
  }

  // Authenticated but doesn't have permission
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Authenticated and allowed
  return children;
};

export default ProtectedRoute;
