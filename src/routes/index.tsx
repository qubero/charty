import { RouteObject } from 'react-router-dom';
import { App } from '../components/App';
import { ErrorPage } from './ErrorPage';
import { Settings } from './Settings';
import { ViewMode } from './ViewMode';

export const ROUTES = {
  ROOT: '/',
  VIEW: 'view-mode',
  SETTINGS: 'settings',
  NO_MATCH: '*',
};

const routes: RouteObject[] = [
  {
    path: ROUTES.ROOT,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.VIEW,
        element: <ViewMode />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <Settings />,
      },
    ],
  },
];

export default routes;
