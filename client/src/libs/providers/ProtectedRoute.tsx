import type { PropsWithChildren } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }: PropsWithChildren) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || user === null) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
