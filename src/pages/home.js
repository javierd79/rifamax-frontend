import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import {Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import { useAuthState } from "../context/auth";
import "../assets/scss/pages/home.scss";
import Header from "../components/header";
import { BsFillPersonFill } from "react-icons/bs";
import { StatusCard } from "../assets/data/statusCard.js";
import axios from "axios";
import Barcode from 'react-barcode';

function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [isActive, setIsActive] = useState(null);
  const [allRifas, setAllRifas] = useState(null);
  const [pops, setPops] = useState(false);

  let config = {
    displayValue: false,
    height: 40,
    margin: 0
  };

  const userDetails = useAuthState();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios
      .get("http://159.203.76.114/api/v1/rifas/actives", {
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
        },
      })
      .then((res) => {
        setAllRifas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDetails.token]);
  
  const handleAccordion = index => {
    if (isActive === index) {
      setIsActive(null);
    } else {
      setIsActive(index);
    }
  };

  const togglePops = () => {
    setPops(!pops);
  }

  return (
    <>
      <Sidebar isOpen={isOpen} />
      <div className={isOpen === true ? "openContainer" : "closeContainer"}>
        <Header>
          <div className="toggle">
            <BsFillPersonFill
              id="Popover1"
              type="button"
              onClick={togglePops}
              style={{
                cursor: "pointer",
                position: "absolute",
                left: "calc(100% - 5em)",
                marginTop: "5px",
                fontSize: "23px",
              }}
            />
            {pops === true ? (
              <Popover 
                placement="bottom"
                target="Popover1"
                toggle={togglePops}
                >
                  <PopoverHeader>
                    ¿Desea cerrar sesión?
                  </PopoverHeader>
                  <PopoverBody>
                    <button className="btn btn-danger" 
                      // onClick={() => {
                      //   localStorage.removeItem("token");
                      //   window.location.href = "/login";
                      // }}
                      >Cerrar sesión</button>
                  </PopoverBody>
              </Popover>
            ) : null} 
            <button className="toggleButton" onClick={toggleSidebar}>
              <div></div><div></div><div></div>
            </button>
            <br />
          </div>
        </Header>
        <div className="container-fluid home">
          <StatusCard />
          {allRifas !== null ? (
            allRifas.length === 0 ? (
              <div className="card">
                <div className="card-body">
                  <div className="accordion">
                    <div className="accordion-item">
                      <hr />
                      <h3 className="not-found">No hay rifas activas</h3>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-body">
                <h3 className="card-title">Rifas de carros</h3>
                <h6 className="mb-2 mtext-muted card-subtitle">Estado de las Rifas mensuales</h6>
                  <div className="accordion-container">
                    {allRifas.map((element, index) => {
                      return (
                        <div className="accordion" key={index}>
                          <div className="accordion-item">
                            <div
                              className="accordion-title"
                              onClick={handleAccordion.bind(this, index)}
                            >
                              <div>Rifa de: {element.awardSign}</div>
                              <p className="text-muted subtitle text-center">{element.rifDate}</p>
                              <p className="text-muted subtitle text-end">{element.name}</p>
                              <div className="icon">+</div>
                            </div>
                            {isActive === index ? (
                              <div className="accordion-content">
                                <strong>
                                </strong>
                                  <p className="text-muted">Serie numero: {element.id}</p>
                                  <p className="text-muted">Serial: {element.serial}</p>
                                  <p className="text-muted">Fecha: {element.created_at.substring(0, 10)}</p>
                                  <p className="text-muted">Hora: {element.created_at.substring(11, 16)}</p>
                                  <p className="text-muted">Loteria: {element.loteria}</p>
                                  <p className="text-muted">Premio sin Signo: {element.awardNoSign}</p>
                                  <p className="text-muted">Placa: {element.plate}</p>
                                  <p className="text-muted">Año: {element.year}</p>
                                  <p className="text-muted">Precio: {element.price}$</p>
                                  <p className="text-muted">Responsable: {element.name}</p>
                                  <Barcode value={element.serial} {...config}/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <p className="text-muted">Fecha de inicio: {element.rifDate}</p> 
                                  <p className="text-muted">Fecha de finalización: {element.expired}</p>  
                              </div>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                    <button className="btn btn-primary w-100">Crear una rifa</button>
                  </div>
                </div>
              </div>
            )
          ) : (
            <>
              <div className="card">
                <div className="card-body">
                  <hr />
                  <h3 className="not-found">No hay rifas activas</h3>
                  <hr />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
