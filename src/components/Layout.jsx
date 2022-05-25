import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from './AppBar/AppBar';
import { Container } from './Global';

export const Layout = () => {
  return (
    <>
      <AppBar />
      <Container>
        <Suspense>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};
