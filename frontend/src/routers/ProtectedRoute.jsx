import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Still loading user or auth info
  if (user === null) {
    // Not authenticated
    if (allowedRoles.includes('company')) {
    //   return <Navigate to="/company/login" state={{ from: location }} replace />;
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
