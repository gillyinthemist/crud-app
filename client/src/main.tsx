import React from 'react';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './layouts/root-layout.tsx';

import IndexPage from './routes/index.tsx';
import DashboardPage from './routes/dashboard.tsx';
import DashboardLayout from './layouts/dashboard-layout.tsx';
import EmployeePage from './routes/employees.tsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <IndexPage /> },
      // { path: '/sign-in', element: <SignInPage /> },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/dashboard/employees', element: <EmployeePage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
