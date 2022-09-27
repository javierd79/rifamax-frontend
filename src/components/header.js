import React from 'react'
import '../assets/scss/components/header.scss'
import RifaMaxLogo from '../assets/images/LogoRifaMax.png'

function Header({ children }) {
  return (
    <>
      <div className="header">
        <div className="flex">
          {/* <img src={RifaMaxLogo} alt="RifaMax" className="logo" /> */}
          <div className="items">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header