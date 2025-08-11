import { useEffect } from "react";
import { Navigate, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { checkAuthAsync } from "./store/slices/authSlice";
import ToastPortal from "./components/common/ToastPortal";
import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MemberPage";
import AssociatePage from "./pages/AssociatePage";
import GeneralPage from "./pages/GeneralPage";
import CartPage from "./pages/CartPage";
import ListFrontsPage from "./pages/fronts/ListFrontsPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ReadFrontPage from "./pages/fronts/ReadFrontPage";
import ListMenuPage from "./pages/menu/ListMenuPage";
import ReadMenuPage from "./pages/menu/ReadMenuPage";


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
              element={isAuthenticated
                ? <Navigate to="/member" />
                : <LoginPage />
              }
            />
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
            <Route
              path="/menu"
              element={
                <ProtectedRoute>
                  <ListMenuPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/menu/:id"
              element={
                <ProtectedRoute>
                  <ReadMenuPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fronts"
              element={
                <ProtectedRoute>
                  <ListFrontsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/front/:id"
              element={
                <ProtectedRoute>
                  <ReadFrontPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastPortal />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App;