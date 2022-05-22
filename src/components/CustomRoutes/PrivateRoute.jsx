import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLogged } from 'redux/authSlice';

export const PrivateRoute = ({ children }) => {
  const isLogged = useSelector(getIsLogged);
  return isLogged ? children : <Navigate to="/" replace={true} />;
};
