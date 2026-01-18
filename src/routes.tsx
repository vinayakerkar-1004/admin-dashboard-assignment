import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import { UsersPage } from '@/pages';
import { RouteError } from '@/components/RouteError';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        element: <UsersPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
    ],
  },
]);
