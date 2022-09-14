import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuthState } from '../../context/auth';

const AuthRouter = ({ component: Component, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState();
  return (
    <Route
      path={path}
      render={(props) => 
        isPrivate && !Boolean(userDetails.token) ? (
          <Redirect to={{ pathname: '/login'}} />
        ) : (
          <Component {...props}/>
        )
      } 
      {...rest}
    />
  )
}

export default AuthRouter;