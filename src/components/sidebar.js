import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../assets/images/avatar.png'
import sidebar from '../assets/data/sidebar.json'
import '../assets/scss/components/sidebar.scss'
// import { logout, useAuthDispatch, useAuthState } from '../context/auth'


function Sidebar(props) {
  return (
    <>
      <div className="wrapper">
        <div
          className={props.isOpen === true ? "sidebar open" : "sidebar close"}
        >
          <div className="profile">
            <img src={Avatar} alt="profile" className="profile-pic" />
            <h3 className="profile-name">Taquilla</h3>
            <p className="profile-role">Role: Taquilla</p>
          </div>
          <ul>
            {sidebar.map((element, index) => {
              return (
                <li key={index}>
                  <Link to={element.path} className="link">
                    <span className="item">{element.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;