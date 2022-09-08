import { lazy } from 'react';

const Home = lazy(() => import('../pages/home.js'));
const Login = lazy(() => import('../pages/login.js'));

const Router = [
  {
    path: '/login',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/',
    component: Home,
    isPrivate: false,
  }
]

export default Router;