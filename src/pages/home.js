import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useAuthState } from "../context/auth";
import "../assets/scss/pages/home.scss";
import Header from "../components/header";
import { BsFillPersonFill } from "react-icons/bs";
import { StatusCard } from "../assets/data/statusCard.js";
import axios from "axios";

function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [isActive, setIsActive] = useState(null);
  const [allRifas, setAllRifas] = useState(null);

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

  return (
    <>
      <Sidebar isOpen={isOpen} />
      <div className={isOpen === true ? "openContainer" : "closeContainer"}>
        <Header>
          <div className="toggle">
            <BsFillPersonFill
              style={{
                cursor: "pointer",
                position: "absolute",
                left: "calc(100% - 3.5em)",
                marginTop: "5px",
                fontSize: "23px",
              }}
            />
            {isOpen === true ? (
              <GrClose
                onClick={toggleSidebar}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  left: "calc(100% - 1.5em)",
                  marginTop: "5px",
                  fontSize: "23px",
                }}
              />
            ) : (
              <GiHamburgerMenu
                onClick={toggleSidebar}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  left: "calc(100% - 1.5em)",
                  marginTop: "5px",
                  fontSize: "23px",
                }}
              />
            )}
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
                              <div className="icon">+</div>
                            </div>
                            {isActive === index ? (
                              <div className="accordion-content">
                                <strong>
                                </strong>
                                  <p className="text-muted">Fecha de inicio: {element.rifDate}</p>
                                  <p className="text-muted">Fecha de finalización: {element.expired}</p>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )
          ) : (
            <>
              <div className="accordion">
                <div className="accordion-item">
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
