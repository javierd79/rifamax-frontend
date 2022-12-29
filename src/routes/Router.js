import { lazy } from 'react';

const NotFound = lazy(() => import('../pages/notfound.js'));
const Home = lazy(() => import('../pages/home.js'));
const Login = lazy(() => import('../pages/login.js'));
const Users = lazy(() => import('../pages/users.js'));
const Riferos = lazy(() => import('../pages/riferos.js'));
const rifasMoto = lazy(() => import('../pages/rifasMoto.js'));

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
    path: '/riferos',
    component: Riferos,
    isPrivate: true,
  },
  {
    path: '/rifas/motos',
    component: rifasMoto,
    isPrivate: true,
  },
  {
    path: '/',
    component: Home,
    isPrivate: true,
  },
  {
    path: '/*',
    component: NotFound,
    isPrivate: false,
  }
]

export default Router;