import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  let content: ReactNode = children;

  if (isLoading) {
    content = <div>Loading…</div>;
  } else if (!isAuthenticated) {
    content = <Navigate to="/login" />;
  } else if (allowedRoles && !allowedRoles.includes(user!.role)) {
    content = <Navigate to="/unauthorized" />;
  }

  return <>{content}</>;
}