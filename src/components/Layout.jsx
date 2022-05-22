import { Outlet } from 'react-router-dom';
import { Container } from './Global';

export const Layout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};
