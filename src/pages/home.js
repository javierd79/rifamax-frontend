import React, { useState } from 'react'
import Sidebar from '../components/sidebar'
import {GiHamburgerMenu} from 'react-icons/gi'
import {GrClose} from 'react-icons/gr'
import '../assets/scss/pages/home.scss'
import Header from '../components/header'
import { BsFillPersonFill } from "react-icons/bs"

function Home() {
  const [isOpen, setIsOpen] = useState(true)
  const [isPop, setIsPop] = useState(false)

  const PopOver = (popOpen) => {
    return (
      popOpen === true ? (
        <div className="popover" style={{ cursor: 'pointer', position: 'absolute', left: 'calc(100% - 3.5em)', marginTop:'5px', fontSize:'23px'}}>
          <div className="popover-content">
            <h1>awa</h1>
          </div>
        </div>
      ) : null
    )
  }

  const togglePopOver = () => {
    setIsPop(!isPop)
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Sidebar isOpen={isOpen}/>
      <div className={isOpen === true ? 'openContainer' : 'closeContainer'}>
        <PopOver popOpen={isPop}/>
        <Header>
          <div className='toggle'>
            <BsFillPersonFill onClick={togglePopOver} style={{ cursor: 'pointer', position: 'absolute', left: 'calc(100% - 3.5em)', marginTop:'5px', fontSize:'23px'}} />
            {
              isOpen === true ?
              <GrClose onClick={toggleSidebar} style={{ cursor: 'pointer', position: 'absolute', left: 'calc(100% - 1.5em)', marginTop:'5px', fontSize:'23px'}}/>
              :
              <GiHamburgerMenu onClick={toggleSidebar} style={{ cursor: 'pointer', position: 'absolute', left: 'calc(100% - 1.5em)', marginTop:'5px', fontSize:'23px'}}/>
            }
            <br/>
          </div>
        </Header>
        <div className='container-fluid home'>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-xs-12 col-status">
              <div className="p-3 border status-card">Row column</div>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12 col-status">
              <div className="p-3 border status-card">Row column</div>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12 col-status">
              <div className="p-3 border status-card">Row column</div>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12 col-status">
              <div className="p-3 border status-card">Row column</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home