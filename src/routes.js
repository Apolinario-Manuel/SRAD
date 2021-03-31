import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import QuestionView from 'src/views/question/QuestionView';
import CandidatosCat from 'src/views/candidatosCat';
import CategoryList from 'src/views/categoryList';
import DashboardView from 'src/views/reports/DashboardView';
import NotFoundView from 'src/views/errors/NotFoundView';
import Rooms from 'src/views/rooms';
import Category from 'src/views/category';
import UsersListView from 'src/views/users/UsersListView';
import LoginAdmin from 'src/views/login/LoginAdmin';
import ProvasModule from 'src/views/prova/ProvaPage';
import ResultModule from 'src/views/prova/ResultProva';
import ResultAdminModule from 'src/views/prova/ResultAdmin';
import SalaPage from 'src/views/salaPage/SalaPage';
import Pedido from 'src/views/pedido/Pedido';
import Concurso from 'src/views/concurso/Concurso';
import Add from 'src/views/casos/add';
import Casos from 'src/views/casos/Casos';
import ConcursoList from 'src/views/concurso/ConcursoList';
import DetalhePedido from 'src/views/pedido/DetalhePedido';
import Candidatos from 'src/views/candidates';

const routes = (isAdmin, isCandidate) => [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'form/:id', element: <QuestionView /> },
      { path: 'categoryList', element: <CategoryList /> },
      { path: 'candidatoscat/:id', element: <CandidatosCat /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'rooms', element: <Rooms /> },
      { path: 'categoria/:id', element: <Category /> },
      { path: 'resultadmin/:id', element: <ResultAdminModule /> },
      { path: 'sala/:id', element: <SalaPage /> },
      { path: 'detalhe/:id', element: <DetalhePedido /> },
      { path: 'pedidos', element: <Pedido /> },
      { path: 'concursos', element: <Concurso /> },
      { path: 'concurso/:id', element: <ConcursoList /> },
      { path: 'casos', element: <Casos /> },
      { path: 'casos/add', element: <Add /> },
      { path: 'candidates', element: <Candidatos /> },
      { path: 'users', element: <UsersListView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  { path: 'prova/:id', element: <ProvasModule /> },
  { path: 'resultado', element: <ResultModule /> },
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
