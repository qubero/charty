import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { ROUTES } from '..';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      {isRouteErrorResponse(error) ? (
        <div>
          <h1>Oops!</h1>
          <h2>{error.status}</h2>
          <p>{error.statusText}</p>
          {error.data?.message && <p>{error.data.message}</p>}
        </div>
      ) : (
        <div>Oops</div>
      )}
      <Link to={ROUTES.ROOT}>to root</Link>
    </>
  );
};

export default ErrorPage;
