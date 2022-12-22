import React from 'react'
import '../assets/scss/components/header.scss'
import RifaMaxLogo from '../assets/images/ticket.png'

function Header({ children }) {
  return (
    <>
      <div className="header">
        <div className="flex">
          <img src={RifaMaxLogo} alt="RifaMax" className="logo" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
          <div className="items">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header