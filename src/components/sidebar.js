import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../assets/images/avatar.png'
import sidebar from '../assets/data/sidebar.json'
import '../assets/scss/components/sidebar.scss'

function Sidebar(isOpen, route) {
  return (
    <>
      {
        isOpen !== true && route === '/login' ? null : (
          <div className='wrapper'>
            <div className='sidebar'>
              <div className='profile'>
                <img src={Avatar} alt='profile' className='profile-pic' />
                <h3 className='profile-name'>Profile Name</h3>
                <p className='profile-role'>Profile Role</p>
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
            </ul>
            </div>
          </div>
        )
      } 
    </>
  )
}

export default Sidebar