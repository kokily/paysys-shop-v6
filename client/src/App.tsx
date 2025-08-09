import { useEffect } from "react";
import { Navigate, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { checkAuthAsync } from "./store/slices/authSlice";
import ToastPortal from "./components/common/ToastPortal";
import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MemberPage";


function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(checkAuthAsync());
    }
  }, [dispatch])

  if (loading) {
    return <div className="loading">로딩 중...</div>
  }

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/member" /> : <LoginPage />}
            />
            <Route
              path="/member"
              element={isAuthenticated ? <MemberPage /> : <Navigate to="/" />}
            />
          </Routes>
          <ToastPortal />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App;