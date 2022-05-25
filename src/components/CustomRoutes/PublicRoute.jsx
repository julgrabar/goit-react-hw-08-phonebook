import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLogged } from 'redux/auth/authSlice';

export const PublicRoute = ({ children, restricted }) => {
  const isLogged = useSelector(getIsLogged);
  return isLogged && restricted ? (
    <Navigate to="/contacts" replace={true} />
  ) : (
    children
  );
};
