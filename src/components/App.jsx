import { Toaster } from 'react-hot-toast';
import { Global } from './Global';
import { AppBar } from './AppBar/AppBar';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from 'views/HomeView';
import { LoginPage } from 'views/LoginView';
import { RegisterPage } from 'views/RegisterView';
import { ContactsPage } from 'views/ContactsView';
import { NotFoundPage } from 'views/NotFoundPage';
import { PrivateRoute } from './CustomRoutes/PrivateRoute';
import { PublicRoute } from './CustomRoutes/PublicRoute';
import { getToken, useRefreshLoginQuery } from 'redux/authSlice';
import { useSelector } from 'react-redux';

export const App = () => {
  const token = useSelector(getToken);
  console.log(Boolean(!token));
  useRefreshLoginQuery(null, { skip: !token });

  return (
    <div>
      <Global />
      <AppBar />

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

      <Toaster position="top-right" />
    </div>
  );
};
