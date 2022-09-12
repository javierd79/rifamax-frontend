import React, { useState, useEffect } from 'react'
import Sidebar from '../components/sidebar'
import {GiHamburgerMenu} from 'react-icons/gi'
import {GrClose} from 'react-icons/gr'
import '../assets/scss/pages/home.scss'
import Header from '../components/header'
import { BsFillPersonFill } from "react-icons/bs"
import { StatusCard } from '../assets/data/statusCard.js'
import axios from 'axios';

function Home() {
  const [isOpen, setIsOpen] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const [allRifas, setAllRifas] = useState(null)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    // axios.get('http://
  }, [])

  return (
    <>
      <Sidebar isOpen={isOpen}/>
      <div className={isOpen === true ? 'openContainer' : 'closeContainer'}>
        <Header>
          <div className='toggle'>
            <BsFillPersonFill style={{ cursor: 'pointer', position: 'absolute', left: 'calc(100% - 3.5em)', marginTop:'5px', fontSize:'23px'}} />
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
          <StatusCard />
          <div className='accordion'>
            <div className='accordion-item'>
              <div className='accordion-title' onClick={() => setIsActive(!isActive)}>
                {/* <div className="blob"></div> */}
                <div>Rifa de:</div>
                <div className={isActive === true ? 'icon-open' : 'icon'}>+</div>
              </div>
              <div className='accordion-content'>
                Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim
                labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi
                animcupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est
                aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia
                pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit
                commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa
                proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia
                eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim.
                Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et
                culpa duis.
              </div>
            </div>
          </div>
          <div className='accordion'>
            <div className='accordion-item'>
              <div className='accordion-title'>
                <div>Rifa de:</div>
                <div className='icon'>+</div>
              </div>
              <div className='accordion-content'>
                Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim
                labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi
                animcupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est
                aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia
                pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit
                commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa
                proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia
                eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim.
                Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et
                culpa duis.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home