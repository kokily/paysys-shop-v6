import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { checkAuthAsync } from './store/thunks/authThunks';
import Loading from './components/common/Loading';
import ProtectedRoute from './libs/providers/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import MemberPage from './pages/home/MemberPage';
import AssociatePage from './pages/home/AssociatePage';
import GeneralPage from './pages/home/GeneralPage';

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(checkAuthAsync());
    }
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <HelmetProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/member" /> : <LoginPage />} />
            <Route
              path="/member"
              element={
                <ProtectedRoute>
                  <MemberPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/associate"
              element={
                <ProtectedRoute>
                  <AssociatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/general"
              element={
                <ProtectedRoute>
                  <GeneralPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
