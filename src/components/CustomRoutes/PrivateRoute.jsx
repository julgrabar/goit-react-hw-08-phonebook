import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLogged } from 'redux/auth/authSlice';

export const PrivateRoute = ({ children }) => {
  const isLogged = useSelector(getIsLogged);
  return isLogged ? children : <Navigate to="/login" replace={true} />;
};
