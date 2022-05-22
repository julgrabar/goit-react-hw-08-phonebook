import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getIsLogged, getUser } from 'redux/authSlice';

export const HomePage = () => {
  const isLogged = useSelector(getIsLogged);
  const { name } = useSelector(getUser);
  return (
    <>
      <h1>Welcome to Phonebook</h1>
      {isLogged ? (
        <p>{`You are logged in as ${name}`}</p>
      ) : (
        <p>
          To use Phonebook <NavLink to="/signup">create an account</NavLink> or{' '}
          <NavLink to="/login">log in</NavLink>
        </p>
      )}
    </>
  );
};
