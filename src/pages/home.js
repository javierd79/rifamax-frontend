import React, { useState } from 'react'
import Sidebar from '../components/sidebar'
import {GiHamburgerMenu} from 'react-icons/gi'
import {GrClose} from 'react-icons/gr'

function Home() {
  const [isOpen, setIsOpen] = useState(true)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Sidebar isOpen={isOpen}/>
      <div className={isOpen === true ? 'openContainer' : 'closeContainer'}>
        {
          isOpen === true ?
          <GrClose onClick={toggle} style={{position: 'absolute', left: '98%', marginTop:'5px', fontSize:'23px'}}/>
          :
          <GiHamburgerMenu onClick={toggle} style={{position: 'absolute', left: '98%', marginTop:'5px', fontSize:'23px'}}/>
        }
      </div>
    </>
  )
}

export default Home