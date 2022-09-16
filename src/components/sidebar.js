import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../assets/images/avatar.png'
import sidebar from '../assets/data/sidebar.json'
import '../assets/scss/components/sidebar.scss'
import { useAuthState } from '../context/auth'

function Sidebar(props) {

  const userDetails = useAuthState();

  return (
    <>
      <div className="wrapper">
        <div
          className={props.isOpen === true ? "sidebar open" : "sidebar close"}
        >
          <div className="profile">
            <img src={Avatar} alt="profile" className="profile-pic" />
            <h3 className="profile-name">{userDetails.user.username}</h3>
            <p className="profile-role">{userDetails.user.role}</p>
          </div>
          {console.log(userDetails.user.role)}
          <ul>
            {
              userDetails.user.role === "Admin" ? (
                sidebar.admin.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={item.path} className="link">
                        <span className="title">{item.name}</span>
                      </Link>
                    </li>
                  );
                }
                )
              ) : null
            }
            {
              userDetails.user.role === "Agencia" ? (
                sidebar.agency.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={item.path} className="link">
                        <span className="title">{item.name}</span>
                      </Link>
                    </li>
                  );
                })
              ) : null
            }
            {
              userDetails.user.role === "Taquilla" ? (
                sidebar.taquilla.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={item.path} className="link">
                        <span className="title">{item.name}</span>
                      </Link>
                    </li>
                  );
                })
              ) : null
            }
            {
              userDetails.user.role === "Rifero" ? (
                sidebar.rifero.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={item.path} className="link">
                        <span className="title">{item.name}</span>
                      </Link>
                    </li>
                  );
                })
              ) : null
            }
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;