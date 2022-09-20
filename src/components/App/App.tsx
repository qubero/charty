import { Navigate, Outlet, useMatch } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { Header } from '../Header';

const App = () => {
  const isRoot = useMatch(ROUTES.ROOT);

  if (isRoot) {
    return <Navigate to={ROUTES.VIEW} replace={true} />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
