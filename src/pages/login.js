import React, { useState } from 'react'
import { loginUser, useAuthState, useAuthDispatch } from '../context/auth';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let res = await loginUser(dispatch, { email, password });
      if (!res.user) return;
      props.history.push('/');
      window.location.reload();
    } catch (error){
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

        <br/>

        <label htmlFor="password">Password</label>
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />

        <button disabled={loading} onCLick={()=>console.log(errorMessage)}>Login</button>
        {errorMessage && <div>{errorMessage.message}</div>}
      </form>
    </>
  )
}

export default Login