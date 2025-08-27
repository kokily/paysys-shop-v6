import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { checkAuthAsync } from './store/thunks/authThunks';
import Loading from './components/common/Loading';
import ProtectedRoute from './libs/providers/ProtectedRoute';
import ToastPortal from './libs/portals/ToastPortal';
import ModalPortal from './libs/portals/ModalPortal';
import LoginPage from './pages/auth/LoginPage';
import MemberPage from './pages/home/MemberPage';
import AssociatePage from './pages/home/AssociatePage';
import GeneralPage from './pages/home/GeneralPage';
import ListMenuPage from './pages/menu/ListMenuPage';
import ReadMenuPage from './pages/menu/ReadMenuPage';
import CartPage from './pages/cart/CartPage';
import ListFrontsPage from './pages/front/ListFrontsPage';
import ReadFrontPage from './pages/front/ReadFrontPage';
import AddReservePage from './pages/reserve/AddReservePage';
import ChangePasswordPage from './pages/password/ChangePasswordPage';
import ListItemsPage from './pages/item/ListItemsPage';
import ReadItemsPage from './pages/item/ReadItemPage';
import AddItemsPage from './pages/item/AddItemPage';
import UpdateItemsPage from './pages/item/UpdateItemPage';
import ListUsersPage from './pages/user/ListUsersPage';
import ReadUsersPage from './pages/user/ReadUserPage';

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, loading } = useAppSelector((state) => state.auth);

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
            <Route
              path="/"
              element={isAuthenticated && user !== null ? <Navigate to="/member" /> : <LoginPage />}
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
            <Route
              path="/front/update/:id"
              element={
                <ProtectedRoute>
                  <AddReservePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/password"
              element={
                <ProtectedRoute>
                  <ChangePasswordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/items"
              element={
                <ProtectedRoute>
                  <ListItemsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/item/:id"
              element={
                <ProtectedRoute>
                  <ReadItemsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/item/add"
              element={
                <ProtectedRoute>
                  <AddItemsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/item/update/:id"
              element={
                <ProtectedRoute>
                  <UpdateItemsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <ListUsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:id"
              element={
                <ProtectedRoute>
                  <ReadUsersPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastPortal />
          <ModalPortal />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
