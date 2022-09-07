import React, { useReducer, useContext, createContext } from 'react';
import { initialState, AuthReducer } from './reducer';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined){
    throw new Error(`UseAuthState must be used within a AuthProvider`)
  }
  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined){
    throw new Error(`UseAuthDispatch must be used within a AuthProvider`)
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch ] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};