import { lazy } from 'react';

const Home = lazy(() => import('../pages/home.js'));
const Login = lazy(() => import('../pages/login.js'));
const Users = lazy(() => import('../pages/users.js'));

const Router = [
  {
    path: '/login',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/users',
    component: Users,
    isPrivate: true,
  },
  {
    path: '/',
    component: Home,
    isPrivate: true,
  }
]

export default Router;