import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuthState } from '../../context/auth';

const AuthRouter = ({ component: Component, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState();

  const permissions = {
    Admin: ['/', '/users'],
    Rifero: ['/'],
    Taquilla: ['/'],
    Agencia: ['/'],
    undefined: ['/login'],
    null: ['/login'],
  };

  return (
    <Route
      path={path}
      render={(props) => 
        isPrivate && !Boolean(userDetails.token) ? (
          <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
        ) : (
          permissions[userDetails.user.role].includes(path) ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location }}} />
        )
      )} 
      {...rest}
    />
  )
}

export default AuthRouter;