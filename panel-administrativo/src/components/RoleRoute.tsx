import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { authService, Rol } from '../services/auth';

interface RoleRouteProps {
  children: ReactNode;
  allowedRoles: Rol[];
  fallbackPath?: string;
}

export default function RoleRoute({ 
  children, 
  allowedRoles, 
  fallbackPath = '/dashboard' 
}: RoleRouteProps) {
  const user = authService.getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!authService.hasAnyRole(allowedRoles)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}
