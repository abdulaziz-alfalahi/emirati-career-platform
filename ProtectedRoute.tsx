import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { hasRole, hasAnyRole } from '../lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  requireAnyRole?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles = [], 
  requireAnyRole = false 
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If no specific roles are required, just being authenticated is enough
  if (requiredRoles.length === 0) {
    return <>{children}</>;
  }

  // Check if user has the required roles
  const hasRequiredRoles = requireAnyRole
    ? hasAnyRole(user, requiredRoles)
    : requiredRoles.every(role => hasRole(user, role));

  if (!hasRequiredRoles) {
    // Redirect to unauthorized page if user doesn't have required roles
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
