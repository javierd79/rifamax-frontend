import React, { useState } from 'react'
import { loginUser, useAuthState, useAuthDispatch } from '../context/auth';
import "../assets/scss/pages/login.scss";
import RifaMaxLogo from '../assets/images/ticket.png'

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
    } catch (error){
      console.error(error);
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleLogin}>
        <img src={RifaMaxLogo} alt="RifaMax" className="logo" />
        <div className='form-control'>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

          <br/>

          <label htmlFor="password">Password</label>
          <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />

          <button className='btn' disabled={loading} onClick={()=>console.log(errorMessage)}>Login</button>
            
        </div>
        {errorMessage && <div className="alert alert-danger mt-2"><p className="text-center">No autorizado</p></div>}
      </form>
    </div>
  )
}

export default Login