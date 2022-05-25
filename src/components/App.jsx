import { Global } from './Global';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { PrivateRoute } from './CustomRoutes/PrivateRoute';
import { PublicRoute } from './CustomRoutes/PublicRoute';
import { getToken } from 'redux/auth/authSlice';
import { useSelector } from 'react-redux';
import { lazy } from 'react';
import { useRefreshLoginQuery } from 'redux/auth/authAPI';

const RegisterPage = lazy(() => import('views/RegisterView'));
const LoginPage = lazy(() => import('views/LoginView'));
const ContactsPage = lazy(() => import('views/ContactsView'));
const HomePage = lazy(() => import('views/HomeView'));
const NotFoundPage = lazy(() => import('views/NotFoundPage'));

export const App = () => {
  const token = useSelector(getToken);
  useRefreshLoginQuery(null, { skip: !token });

  return (
    <div>
      <Global />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="login"
            element={
              <PublicRoute restricted>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="signup"
            element={
              <PublicRoute restricted>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
