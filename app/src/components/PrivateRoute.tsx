import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const userContext = useAuth();
  console.log("User Context:", userContext);
  if (!userContext || !userContext.isAuthenticated) {
    return <Navigate to="/login" />;
  } else if (allowedRoles && !allowedRoles.includes(userContext.user!.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default PrivateRoute;