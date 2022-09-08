import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../assets/images/avatar.png'
import sidebar from '../assets/data/sidebar.json'
import '../assets/scss/components/sidebar.scss'
//import { useHistory } from "react-router-dom";
import { logout, useAuthDispatch, useAuthState } from '../context/auth'

function Sidebar(props) {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  const handleLogout = () => {
          logout(dispatch);
          //props.history.push('/login');
  };

  return (
    <>
      {
        props.isOpen !== true ? null : (
          <div className='wrapper'>
            <div className='sidebar'>
              <div className='profile'>
                <img src={Avatar} alt='profile' className='profile-pic' />
                <h3 className='profile-name'>{userDetails.user.name}</h3>
                <p className='profile-role'>{userDetails.role}</p>
              </div>
            <ul>
             {
              sidebar.map((element, index) => {
                return (
                  <li key={index}>
                    <Link to={element.path} className="link">
                        <span class="item">{element.name}</span>
                    </Link>
                  </li>
                  )
                })
              }  
              <button to='/login' className="link" onClick={handleLogout()}>
                <span class="logout">Salir</span>
              </button>
            </ul>
            </div>
          </div>
        )
      } 
    </>
  )
}

export default Sidebar