import React from 'react';
import { useAuth } from '../../lib/AuthContext';
import { hasRole, hasAnyRole } from '../../lib/auth';

interface RoleBasedNavigationProps {
  children: React.ReactNode;
  requiredRoles: string[];
  requireAnyRole?: boolean;
  fallback?: React.ReactNode;
}

const RoleBasedNavigation: React.FC<RoleBasedNavigationProps> = ({
  children,
  requiredRoles,
  requireAnyRole = false,
  fallback = null
}) => {
  const { user } = useAuth();

  if (!user) {
    return <>{fallback}</>;
  }

  const hasRequiredRoles = requireAnyRole
    ? hasAnyRole(user, requiredRoles)
    : requiredRoles.every(role => hasRole(user, role));

  if (!hasRequiredRoles) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default RoleBasedNavigation;
