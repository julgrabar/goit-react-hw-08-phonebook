import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getIsLogged, getUser, useLogoutMutation } from 'redux/authSlice';
import { UserBar } from './AppBar.styled';
import { Nav } from './AppBar.styled';

export const Navigation = () => {
  const isUserLogged = useSelector(getIsLogged);
  const { name } = useSelector(getUser);
  const [logout] = useLogoutMutation();

  // const handleLogOut = () =>{
  //   logout;
  //   Navigate
  // }

  return (
    <Nav>
      <NavLink to="/">Home</NavLink>
      {isUserLogged && <NavLink to="/contacts">Contacts</NavLink>}

      {isUserLogged ? (
        <UserBar>
          <p>{`Hello, ${name}`}</p>{' '}
          <button type="button" onClick={logout}>
            Logout
          </button>
        </UserBar>
      ) : (
        <UserBar>
          <NavLink to="/login">Log in</NavLink>
          <NavLink to="/signup">Sign up</NavLink>
        </UserBar>
      )}
    </Nav>
  );
};
