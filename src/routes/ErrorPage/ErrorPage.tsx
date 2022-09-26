import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { ROUTES } from '..';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="fixed -z-10 inset-0 flex flex-col items-center justify-center text-2xl">
      {isRouteErrorResponse(error) ? (
        <>
          <h1>Oops!</h1>
          <h2>{error.status}</h2>
          <p>{error.statusText}</p>
          {error.data?.message && <p>{error.data.message}</p>}
        </>
      ) : (
        'Oops'
      )}
      <Link
        to={ROUTES.ROOT}
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        To view
      </Link>
    </div>
  );
};

export default ErrorPage;
