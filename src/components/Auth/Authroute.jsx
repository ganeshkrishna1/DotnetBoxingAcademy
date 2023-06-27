import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component) => {
  return () => {
    const isAuthenticated = sessionStorage.getItem('isLoggedIn') === 'true';
    const userType = sessionStorage.getItem('userType');
    
    // Modify the condition below based on your authentication logic
    const isAdmin = userType === 'admin';

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (isAdmin) {
      return <Navigate to="/academy" replace />;
    }

    return <Navigate to="/viewacademy" replace />;
  };
};

export default withAuth;
