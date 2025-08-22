import type { PropsWithChildren } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
