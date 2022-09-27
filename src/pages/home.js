import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { FormGroup, PopoverBody } from "reactstrap";
import { Popover, PopoverHeader } from "@chakra-ui/react";
import { useAuthState, useAuthDispatch, logout } from "../context/auth";
import "../assets/scss/pages/home.scss";
import Header from "../components/header";
import { BsFillPersonFill } from "react-icons/bs";
import { StatusCard } from "../assets/data/statusCard.js";
import axios from "axios";
import Barcode from "react-barcode";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "../components/modal";

// import Modal from '../components/modal';
// import RifaGenerator from "../components/rifaGenerator";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [allRifas, setAllRifas] = useState(null);
  const [pops, setPops] = useState(false);
  
  const yesterday = () => {
    let today = new Date();
    let DAYS_IN_MS = 1000 * 60 * 60 * 24;
    let yesterday = new Date(today.getTime() - DAYS_IN_MS);
    console.log(yesterday);
    return yesterday;
  };

  const formSchema = Yup.object().shape({
    rifDate: Yup.date()
      .required("Campo requerido")
      .min(yesterday(), "La fecha debe ser mayor a la actual"),
    awardSign: Yup.string() 
      .required("Campo requerido"),
    awardNoSign: Yup.string()
      .required("Campo requerido"),
    plate: Yup.string()
      .required("Campo requerido"),
    year: Yup.number()
      .required("Campo requerido")
      .min(1990, "El año debe ser mayor a 1990")
      .max(new Date().getFullYear(), "El año debe ser menor al actual"),
    loteria: Yup.string()
      .required("Campo requerido"),
    numbers: Yup.number()
      .required("Campo requerido")
      .min(100, "El número debe ser mayor a 100")
      .max(1000, "El número debe ser menor a 1000"),
    expired: Yup.date()
      .required("Campo requerido")
      .min(yesterday(), "La fecha debe ser mayor a la actual"),
    rifero: Yup.number()
      .required("Campo requerido")
      .min(1, "El número debe ser mayor a 1")
      .max(100, "El número debe ser menor a 100"),
    price: Yup.number()
      .required("Campo requerido")
      .min(1, "El número debe ser mayor a 1")
      .max(1000, "El número debe ser menor a 1000"),
  });

  let config = {
    displayValue: true,
    height: 30,
    margin: 0,
  };

  const userDetails = useAuthState();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    logout(dispatch);
    window.location.href = "/login";
  };

  const sendToApp = (id) => {
    axios.put(`http://159.203.76.114/api/v1/rifas/${id}`, {
      is_send: true
    }, {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    }).then((res) => {
      console.log(res);
    });

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

  const handleAccordion = (index) => {
    if (isActive === index) {
      setIsActive(null);
    } else {
      setIsActive(index);
    }
  };

  const togglePops = () => {
    setPops(!pops);
  };

  // const options = riferos?.map((rifero) => {
  //   return (
  //     <option key={rifero.id} value={rifero.id}>
  //       {rifero.name}
  //     </option>
  //   );
  // });

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
            <button className="toggleButton" onClick={toggleSidebar}>
              {isOpen === true ? (
                <>
                  <div className="open"></div>
                  <div className="open"></div>
                  <div className="open"></div>
                </>
              ) : (
                <>
                  <div></div>
                  <div></div>
                  <div></div>
                </>
              )}
            </button>
            {pops === true ? (
              <Popover
                placement="bottom"
                open={pops}
                AnchorEl={pops}
                target="Popover1"
                toggle={togglePops}
              >
                <div className="popover">
                  <PopoverHeader className="text-center justify-center mt-3">
                    ¿Desea cerrar sesión?
                  </PopoverHeader>
                  <hr />
                  <PopoverBody className="px-2 pt-2">
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </PopoverBody>
                </div>
              </Popover>
            ) : null}
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
                      <h3 className="not-found">No hay ordenes activas</h3>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Ordenes de platillo</h3>
                  <h6 className="mb-2 mtext card-subtitle">
                    Estado de las Rifas mensuales
                  </h6>
                  <div className="accordion-container">
                    {allRifas.map((element, index) => {
                      return (
                        <div className="accordion" key={index}>
                          <div className="accordion-item">
                            <div
                              className="accordion-title"
                              onClick={handleAccordion.bind(this, index)}
                            >
                              <div className="col-6 col-xs-12">
                                Orden de: {element.awardSign}
                              </div>
                              <div className="col-6 col-xs-12 text-start rifD">
                                {element.rifDate}
                              </div>
                              <p className="text subtitle text-end">
                                {element.name}
                              </p>
                              {isActive === index ? (
                                <div className="icon">-</div>
                              ) : (
                                <div className="icon">+</div>
                              )}
                            </div>
                            {isActive === index ? (
                              <div className="accordion-content">
                                <div
                                  className="card mb-2"
                                  style={{
                                    maxWidth: "18rem",
                                    minWidth: "2rem",
                                  }}
                                >
                                  <div className="card-body">
                                    <strong></strong>
                                    <p className="text">
                                      Precio: {element.awardNoSign}
                                      <br />
                                      Restaurant: {element.loteria}
                                      <br />
                                      Numero: {element.id}
                                      <br />
                                      Fecha:{" "}
                                      {element.created_at.substring(0, 10)}
                                      <br />
                                      Hora:{" "}
                                      {element.created_at.substring(11, 16)}
                                      <br />
                                      Serial: {element.serial}
                                      <br />
                                      Año: {element.year}
                                      <br />
                                      Precio: {element.price}$
                                      <br />
                                      Responsable: {userDetails.user.username}
                                      <br />
                                      <br />
                                      <Barcode
                                        value={element.serial}
                                        {...config}
                                      />
                                      <br />
                                      <br />
                                      Fecha de inicio: {element.rifDate}
                                    </p>
                                  </div>
                                </div>
                                {element.is_send === true ? (
                                  <>
                                    <button
                                      className="btn btn-primary me-2"
                                      disabled={true}
                                    >
                                      Imprimir
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      disabled={true}
                                    >
                                      Enviar a APP
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="btn btn-primary me-2"
                                      onClick={() => {
                                        sendToApp(element.id);
                                      }}
                                    >
                                      Enviar a APP
                                    </button>
                                  </>
                                )}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                    <Modal
                      btnColor="primary"
                      centered={true}
                      classBtn="w-100"
                      buttonTitle="Agregar ordenes"
                      title="Agregar ordenes"
                    >
                      <Formik
                        initialValues={{
                          rifDate: "",
                          awardSign: "",
                          awardNoSign: "",
                          plate: "",
                          year: "",
                          loteria: "ZULIA 7A",
                          numbers: "",
                          expired: "",
                          rifero: "",
                          price: "",
                        }}
                        validationSchema={formSchema}
                      >
                        <Form>
                          <div className="row">
                            <div className="col-6">
                              <FormGroup>
                                <label htmlFor="rifDate">
                                  Fecha de la orden
                                </label>
                                <Field
                                  className="form-control"
                                  name="rifDate"
                                  placeholder="Fecha de la orden"
                                  type="date"
                                />
                                <ErrorMessage
                                  className="field-error text-danger"
                                  name="rifDate"
                                  component="div"
                                />
                              </FormGroup>
                            </div>
                            <div className="col-6">
                              <FormGroup>
                                <label htmlFor="expired">
                                  Fecha de finalización
                                </label>
                                <Field
                                  className="form-control"
                                  name="expired"
                                  placeholder="Fecha de expiracion"
                                  type="date"
                                />
                                <ErrorMessage
                                  className="field-error text-danger"
                                  name="expired"
                                  component="div"
                                />
                              </FormGroup>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <FormGroup>
                                <label htmlFor="awardSign">
                                  Platillo
                                </label>
                                <Field
                                  className="form-control"
                                  name="awardSign"
                                  placeholder="Platillo"
                                  type="text"
                                />
                                <ErrorMessage
                                  className="field-error text-danger"
                                  name="awardSign"
                                  component="div"
                                />
                              </FormGroup>
                            </div>
                            <div className="col-6">
                              <FormGroup>
                                <label htmlFor="awardNoSign">
                                  Extras
                                </label>
                                <Field
                                  className="form-control"
                                  name="awardNoSign"
                                  placeholder="Premio sin Signo"
                                  type="text"
                                />
                                <ErrorMessage
                                  className="field-error text-danger"
                                  name="awardNoSign"
                                  component="div"
                                />
                              </FormGroup>
                            </div>
                          </div>
                          <hr />
                          <p className="text-center">Opciones</p>
                          <hr />
                          <div className="row">
                            <div className="col-4">
                              <FormGroup>
                                <label htmlFor="plate">Propina</label>
                                <Field
                                  className="form-control"
                                  name="plate"
                                  placeholder="Propina"
                                  type="text"
                                />
                                <ErrorMessage
                                  className="field-error text-danger"
                                  name="plate"
                                  component="div"
                                />
                              </FormGroup>
                            </div>
                            <div className="col-4">
                              <FormGroup>
                                <label htmlFor="year">Porcentaje</label>
                                <Field
                                  className="form-control"
                                  name="year"
                                  placeholder="Porcentaje"
                                  type="number"
                                />
                                <ErrorMessage
                                  className="field-error text-danger"
                                  name="year"
                                  component="div"
                                />
                              </FormGroup>
                            </div>
                            <div className="col-4">
                              <FormGroup>
                                <label htmlFor="loteria">Nombre</label>
                                <Field
                                  className="form-control"
                                  name="loteria"
                                  placeholder="Nombre"
                                  type="text"
                                  value="ZULIA 7A"
                                  disabled={true}
                                />
                                <ErrorMessage
                                  className="field-error text-danger"
                                  name="loteria"
                                  component="div"
                                />
                              </FormGroup>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <FormGroup>
                                <label htmlFor="numbers">Cedula</label>
                                <Field
                                  className="form-control"
                                  name="numbers"
                                  placeholder="Cedula"
                                  type="text"
                                />
                                <ErrorMessage
                                  className="field-error text-danger"
                                  name="numbers"
                                  component="div"
                                />
                              </FormGroup>
                            </div>
                            <div className="col-6">
                              <FormGroup>
                                <label htmlFor="price">Telefono</label>
                                <Field
                                  className="form-control"
                                  name="price"
                                  placeholder="Telefono"
                                  type="number"
                                />
                                <ErrorMessage
                                  className="field-error text-danger"
                                  name="price"
                                  component="div"
                                />
                              </FormGroup>
                            </div>
                          </div>
                          <FormGroup>
                            <label htmlFor="rifero">Restaurant</label>
                            <select className="form-control" name="rifero">
                              <option value="0">Seleccione</option>
                              <option value="1">Restaurante 1</option>
                              <option value="2">Restaurante 2</option>
                              <option value="3">Restaurante 3</option>
                            </select>
                            <ErrorMessage
                              className="field-error text-danger"
                              name="rifero"
                              component="div"
                            />
                          </FormGroup>
                          <hr />
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Crear Rifa
                          </button>
                        </Form>
                      </Formik>
                    </Modal>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="card">
              <div className="card-body">
                <div className="accordion">
                  <div className="accordion-item">
                    <hr />
                    <h3 className="not-found">No hay ordenes activas</h3>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
