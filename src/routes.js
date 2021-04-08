import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import DashboardView from 'src/views/reports/DashboardView';
import NotFoundView from 'src/views/errors/NotFoundView';
import Doencas from 'src/views/doencas';
import UsersListView from 'src/views/users/UsersListView';
import LoginAdmin from 'src/views/login/LoginAdmin';
import Add from 'src/views/casos/add';
import Blog from 'src/views/blog';
import Add2 from 'src/views/blog/add';
import Casos from 'src/views/casos/Casos';

const routes = (isAdmin, isCandidate) => [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'doencas', element: <Doencas /> },
      { path: 'casos', element: <Casos /> },
      { path: 'casos/add', element: <Add /> },
      { path: '/blog', element: <Blog /> },
      { path: '/blog/adicionar/novo', element: <Add2 /> },
      { path: '/blog/adicionar/:id', element: <Add2 /> },
      { path: 'users', element: <UsersListView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'loginAdmin', element: <LoginAdmin /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
