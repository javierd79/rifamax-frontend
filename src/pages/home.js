/* eslint-disable no-unused-vars */
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
  const [riferos, setRiferos] = useState([]);
  const [users, setUsers] = useState([]);

  const yesterday = () => {
    let today = new Date();
    let DAYS_IN_MS = 1000 * 60 * 60 * 24;
    let yesterday = new Date(today.getTime() - DAYS_IN_MS);
    return yesterday;
  };

  const formSchema = Yup.object().shape({
    rifDate: Yup.date()
      .required("Campo requerido")
      .min(yesterday(), "La fecha debe ser mayor a la actual"),
    awardSign: Yup.string().required("Campo requerido"),
    awardNoSign: Yup.string().required("Campo requerido"),
    plate: Yup.string().required("Campo requerido"),
    year: Yup.number()
      .required("Campo requerido")
      .min(1990, "El año debe ser mayor a 1990")
      .max(new Date().getFullYear(), "El año debe ser menor al actual"),
    loteria: Yup.string().required("Campo requerido"),
    numbers: Yup.number()
      .required("Campo requerido")
      .min(100, "El número debe ser mayor a 100")
      .max(1000, "El número debe ser menor a 1000"),
    expired: Yup.date()
      .required("Campo requerido")
      .min(yesterday(), "La fecha debe ser mayor a la actual"),
    rifero_id: Yup.number()
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
    axios
      .put(
        `https://rifa-max.com/api/v1/rifas/${id}`,
        {
          is_send: true,
        },
        {
          headers: {
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };

  const postRifa = (values) => {
    axios
      .post("https://rifa-max.com/api/v1/rifas", values, {
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
        },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };

  useEffect(() => {
    axios
      .get("https://rifa-max.com/api/v1/users", {
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
        },
      })
      .then((res) => {
        setUsers([...res.data]);
      })
      .catch((err) => {});

    axios
      .get("https://rifa-max.com/api/v1/riferos", {
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
        },
      })
      .then((res) => {
        setRiferos([...res.data]);
      })
      .catch((err) => {});
    axios
      .get("https://rifa-max.com/api/v1/rifas/actives", {
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
        },
      })
      .then((res) => {
        setAllRifas(res.data);
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                      <h3 className="not-found">No hay rifas activas</h3>
                      <hr />
                    </div>
                  </div>
                </div>
                <Modal
                  btnColor="primary"
                  centered={true}
                  classBtn="w-100 add-rifas"
                  buttonTitle="Agregar rifas"
                  title="Agregar rifas"
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
                      rifero_id: Number("0"),
                      price: "",
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values) => {
                      postRifa(values);
                    }}
                  >
                    <Form>
                      <div className="row">
                        <div className="col-6">
                          <FormGroup>
                            <label htmlFor="rifDate">Fecha de la rifa</label>
                            <Field
                              className="form-control"
                              name="rifDate"
                              placeholder="Fecha de la Rifa"
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
                            <label htmlFor="awardSign">Premio con Signo</label>
                            <Field
                              className="form-control"
                              name="awardSign"
                              placeholder="Premio con Signo"
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
                              Premio sin signo
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
                            <label htmlFor="plate">Placa</label>
                            <Field
                              className="form-control"
                              name="plate"
                              placeholder="Placa"
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
                            <label htmlFor="year">Año</label>
                            <Field
                              className="form-control"
                              name="year"
                              placeholder="Año"
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
                            <label htmlFor="loteria">Loteria</label>
                            <Field
                              className="form-control"
                              name="loteria"
                              placeholder="Loteria"
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
                            <label htmlFor="numbers">Numeros</label>
                            <Field
                              className="form-control"
                              name="numbers"
                              placeholder="Numeros"
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
                            <label htmlFor="price">Precio</label>
                            <Field
                              className="form-control"
                              name="price"
                              placeholder="Precio"
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
                        <label htmlFor="rifero_id">Rifero</label>
                        <Field
                          as="select"
                          type="number"
                          className="form-control"
                          name="rifero_id"
                          placeholder="Rifero"
                        >
                          <option value="">Seleccione un Rifero</option>
                          {riferos.map((user, index) => (
                            <option key={index} value={Number(user.id)}>
                              {user.user.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          className="field-error text-danger"
                          name="rifero"
                          component="div"
                        />
                      </FormGroup>
                      <hr />
                      <button className="btn btn-primary w-100" type="submit">
                        Crear Rifa
                      </button>
                    </Form>
                  </Formik>
                </Modal>
              </div>
            ) : (
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Rifas de Carros</h3>
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
                                Rifa de: {element.awardSign}
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
                                      Sin Signo: {element.awardNoSign}
                                      <br />
                                      Loteria: {element.loteria}
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
                                      Responsable: {element.user.name}
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
                                    <Modal
                                      btnColor="primary"
                                      centered={true}
                                      classBtn="w-100 button-ticket"
                                      buttonTitle="Ver tickets"
                                      title={`Tickets`}
                                    >
                                      <div className="row">
                                        {element.rifa_tickets
                                          .sort(
                                            (a, b) =>
                                              a.ticket_nro - b.ticket_nro
                                          )
                                          .map((ticket) => {
                                            return (
                                              <div className="col-lg-4 col-xs-12">
                                                <a
                                                  className="ticket-open"
                                                  href={`https://rifa-max.com/api/v1/rifas/ticket/${ticket.serial}`}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                >
                                                  <div className="card mb-2 mt-2 ms-1 me-1">
                                                    <div className="card-body">
                                                      <h5 className="card-title">
                                                        {ticket.ticket_nro}
                                                      </h5>
                                                      <p className="card-text">
                                                        {ticket.sign}
                                                        <p className="text-muted mt-1">
                                                          {ticket.serial}
                                                        </p>
                                                      </p>
                                                      {ticket.is_sold ===
                                                      true ? (
                                                        <p className="ribbon">
                                                          Vendido
                                                        </p>
                                                      ) : null}
                                                    </div>
                                                  </div>
                                                </a>
                                              </div>
                                            );
                                          })}
                                      </div>
                                    </Modal>
                                  </>
                                ) : (
                                  <>
                                    <Modal
                                      btnColor="primary"
                                      centered={true}
                                      classBtn="w-100 button-ticket"
                                      buttonTitle="Enviar a APP"
                                      title={`Enviar a APP`}
                                    >
                                      <div className="row">
                                        {element.rifa_tickets
                                          .sort(
                                            (a, b) =>
                                              a.ticket_nro - b.ticket_nro
                                          )
                                          .map((ticket) => {
                                            return (
                                              <div className="col-lg-4 col-xs-12">
                                                <div className="card mb-2 mt-2 ms-1 me-1">
                                                  <div className="card-body">
                                                    <h5 className="card-title">
                                                      {ticket.ticket_nro}
                                                    </h5>
                                                    <p className="card-text">
                                                      {ticket.sign}
                                                      <p className="text-muted mt-1">
                                                        {ticket.serial}
                                                      </p>
                                                    </p>
                                                    {ticket.is_sold === true ? (
                                                      <p className="ribbon">
                                                        Vendido
                                                      </p>
                                                    ) : null}
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          })}
                                      </div>
                                      <button
                                        className="btn btn-success w-100 w-100"
                                        onClick={() => {
                                          sendToApp(element.id);
                                        }}
                                      >
                                        Confirmar
                                      </button>
                                    </Modal>
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
                      classBtn="w-100 add-rifas"
                      buttonTitle="Agregar rifas"
                      title="Agregar rifas"
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
                          rifero_id: Number("0"),
                          price: "",
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                          postRifa(values);
                        }}
                      >
                        <Form>
                          <div className="row">
                            <div className="col-6">
                              <FormGroup>
                                <label htmlFor="rifDate">
                                  Fecha de la rifa
                                </label>
                                <Field
                                  className="form-control"
                                  name="rifDate"
                                  placeholder="Fecha de la Rifa"
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
                                  Premio con Signo
                                </label>
                                <Field
                                  className="form-control"
                                  name="awardSign"
                                  placeholder="Premio con Signo"
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
                                  Premio sin signo
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
                                <label htmlFor="plate">Placa</label>
                                <Field
                                  className="form-control"
                                  name="plate"
                                  placeholder="Placa"
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
                                <label htmlFor="year">Año</label>
                                <Field
                                  className="form-control"
                                  name="year"
                                  placeholder="Año"
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
                                <label htmlFor="loteria">Loteria</label>
                                <Field
                                  className="form-control"
                                  name="loteria"
                                  placeholder="Loteria"
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
                                <label htmlFor="numbers">Numeros</label>
                                <Field
                                  className="form-control"
                                  name="numbers"
                                  placeholder="Numeros"
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
                                <label htmlFor="price">Precio</label>
                                <Field
                                  className="form-control"
                                  name="price"
                                  placeholder="Precio"
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
                            <label htmlFor="rifero_id">Rifero</label>
                            <Field
                              as="select"
                              type="number"
                              className="form-control"
                              name="rifero_id"
                              placeholder="Rifero"
                            >
                              <option value="">Seleccione un Rifero</option>
                              {riferos.map((user, index) => (
                                <option key={index} value={Number(user.id)}>
                                  {user.user.name}
                                </option>
                              ))}
                            </Field>
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
                    <h3 className="not-found">No hay rifas activas</h3>
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
