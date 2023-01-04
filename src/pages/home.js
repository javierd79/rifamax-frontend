/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { FormGroup, PopoverBody } from "reactstrap";
import { IconButton, Popover, PopoverHeader } from "@chakra-ui/react";
import { useAuthState, useAuthDispatch, logout } from "../context/auth";
import "../assets/scss/pages/home.scss";
import Header from "../components/header";
import { BsFillPersonFill } from "react-icons/bs";
import { StatusCard } from "../assets/data/statusCard.js";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "../components/modal";
import Switch from "react-js-switch";
import RifaMaxLogo from "../assets/images/ticket.png";
import Moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import Users from "./users";

// import Modal from '../components/modal';
// import RifaGenerator from "../components/rifaGenerator";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [allRifas, setAllRifas] = useState(null);
  const [pops, setPops] = useState(false);
  const [riferos, setRiferos] = useState([]);
  const [users, setUsers] = useState([]);
  const [checkState, setCheckState] = useState(false);
  const [money, setMoney] = useState("$");

  const yesterday = () => {
    let today = new Date();
    let DAYS_IN_MS = 1000 * 60 * 60 * 24;
    let yesterday = new Date(today.getTime() - DAYS_IN_MS);
    return yesterday;
  };

  const showToastMessage = (param) => {
    toast.success(param, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const showToastErrorMessage = (param) => {
    toast.error(param, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const formSchema = Yup.object().shape({
    rifDate: Yup.date()
      .required("Campo requerido")
      .min(yesterday(), "La fecha debe ser mayor a la actual"),
    awardSign: Yup.string().required("Campo requerido"),
    awardNoSign: Yup.string().required("Campo requerido"),
    plate: Yup.string().nullable(),
    year: Yup.number()
      .min(1959, "El año debe ser mayor a 1959")
      .nullable()
      .max(new Date().getFullYear(), "El año debe ser menor al actual"),
    loteria: Yup.string().required("Campo requerido"),
    numbers: Yup.number()
      .required("Campo requerido")
      .min(1, "El número debe ser mayor a 100")
      .max(1000, "El número debe ser menor a 1000"),
    rifero_id: Yup.number()
      .required("Campo requerido")
      .min(1, "El número debe ser mayor a 1")
      .max(100, "El número debe ser menor a 100"),
    price: Yup.number()
      .required("Campo requerido")
      .min(1, "El número debe ser mayor a 1"),
    money: Yup.string().required("Campo requerido"),
  });

  const pinSchema = Yup.object().shape({
    pin1: Yup.string().required("Campo requerido"),
    pin2: Yup.string().required("Campo requerido"),
    pin3: Yup.string().required("Campo requerido"),
    pin4: Yup.string()
  });

  // let config = {
  //   displayValue: true,
  //   height: 30,
  //   margin: 0,
  // };

  const toggleCheck = () => {
    setCheckState(!checkState);
  };

  const monedas = [
    {
      id: 1,
      name: "Dolares",
      denomination: "$",
      large: "USD",
    },
    {
      id: 2,
      name: "Bolivares",
      denomination: "Bs",
      large: "VEF",
    },
    {
      id: 3,
      name: "Pesos colombianos",
      denomination: "CUP",
      large: "Pesos colombiano",
    },
  ];

  const userDetails = useAuthState();

  const checkValidate = (param, id) => {
    if (param === true) {
      axios.put(
        `https://rifa-max.com/api/v1/rifas/${id}`, {
          verify: true,
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
    } else {
      axios.put(
        `https://rifa-max.com/api/v1/rifas/${id}`, {
          verify: false,
          pin: null,
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
    }
  }

  const formatInt = (param) => {
    if (param < 10) {
      return `00${param}`
    } else if (param < 100) {
      return `0${param}`
    } else {
      return param
    }
  }

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

  const putPin = (pin, id) => {
    axios
      .put(`https://rifa-max.com/api/v1/rifas/pin/${id}`, pin, {
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
        },
      })
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
        showToastMessage("Rifa creada exitosamente");
        window.location.reload();
      })
      .catch((err) => {
        showToastErrorMessage("Error al crear rifas");
      });
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
        console.log(res.data);
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
                  classBtn="mt-2 addrifas"
                  buttonTitle="Agregar rifas"
                  title="Agregar rifas"
                >
                  <Formik
                    initialValues={{
                      rifDate: "",
                      awardSign: "",
                      awardNoSign: "",
                      plate: null,
                      year: null,
                      loteria: "ZULIA 7A 7:05PM",
                      numbers: "",
                      rifero_id: Number("0"),
                      price: "",
                      money: "$",
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values) => {
                      postRifa(values);
                    }}
                  >
                    <Form>
                      <div className="row">
                        <div className="col-12">
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
                        <div className="col-12">
                          <div
                            className="form-check"
                            style={{ marginLeft: "41%" }}
                          >
                            <p
                              className="form-check-label"
                              style={{
                                marginBottom: "2px",
                                marginLeft: "-2.4%",
                              }}
                            >
                              Dinero
                            </p>
                            <Switch
                              onChange={() => toggleCheck()}
                              value={checkState}
                              name="Opcion"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {checkState === false ? (
                          <>
                            <div className="col-4 justify-center">
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
                          </>
                        ) : (
                          <>
                            <div className="col-4 justify-center">
                              <FormGroup>
                                <label htmlFor="plate">Placa</label>
                                <Field
                                  className="form-control"
                                  name="plate"
                                  placeholder="Placa"
                                  type="text"
                                  value={null}
                                  disabled
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
                                  value={null}
                                  disabled
                                />
                              </FormGroup>
                            </div>
                          </>
                        )}
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
                      <div className="col-12">
                        <FormGroup>
                          <label htmlFor="money">Moneda</label>
                          <Field
                            as="select"
                            type="string"
                            className="form-control"
                            name="money"
                            placeholder="Moneda"
                          >
                            {monedas.map((money, index) => (
                              <option key={index} value={money.denomination}>
                                {money.name ?? "Error"}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            className="field-error text-danger"
                            name="money"
                            component="div"
                          />
                        </FormGroup>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <FormGroup>
                            <label htmlFor="numbers">Numeros</label>
                            <Field
                              className="form-control"
                              name="numbers"
                              placeholder="Numeros"
                              type="number"
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
                              placeholder={`Precio`}
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
                              {user?.user?.name ?? "Sin nombre"}
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
                  <div className="row">
                    <div className="col-md-9 col-xs-12">
                      <h3 className="card-title">Rifas</h3>
                      <h6 className="mb-2 mtext card-subtitle">
                        Estado de las Rifas mensuales
                      </h6>
                    </div>
                    <div className="col-md-3 col-xs-12">
                      <Modal
                        btnColor="primary"
                        centered={true}
                        classBtn="mt-2 addrifas"
                        buttonTitle="Agregar rifas"
                        title="Agregar rifas"
                      >
                        <Formik
                          initialValues={{
                            rifDate: "",
                            awardSign: "",
                            awardNoSign: "",
                            plate: null,
                            year: null,
                            loteria: "ZULIA 7A 7:05PM",
                            numbers: "",
                            rifero_id: Number("0"),
                            price: "",
                            money: "$",
                          }}
                          validationSchema={formSchema}
                          onSubmit={(values) => {
                            postRifa(values);
                          }}
                        >
                          <Form>
                            <div className="row">
                              <div className="col-12">
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
                              <div className="col-12">
                                <div
                                  className="form-check"
                                  style={{ marginLeft: "41%" }}
                                >
                                  <p
                                    className="form-check-label"
                                    style={{
                                      marginBottom: "2px",
                                      marginLeft: "-2.4%",
                                    }}
                                  >
                                    Dinero
                                  </p>
                                  <Switch
                                    onChange={() => toggleCheck()}
                                    value={checkState}
                                    name="Opcion"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              {checkState === false ? (
                                <>
                                  <div className="col-4 justify-center">
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
                                </>
                              ) : (
                                <>
                                  <div className="col-4 justify-center">
                                    <FormGroup>
                                      <label htmlFor="plate">Placa</label>
                                      <Field
                                        className="form-control"
                                        name="plate"
                                        placeholder="Placa"
                                        type="text"
                                        value={null}
                                        disabled
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
                                        value={null}
                                        disabled
                                      />
                                    </FormGroup>
                                  </div>
                                </>
                              )}
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
                            <div className="col-12">
                              <FormGroup>
                                <label htmlFor="money">Moneda</label>
                                <Field
                                  as="select"
                                  type="string"
                                  className="form-control"
                                  name="money"
                                >
                                  {monedas.map((money, index) => (
                                    <option
                                      key={index}
                                      value={money.denomination}
                                    >
                                      {money.name ?? "Error"}
                                    </option>
                                  ))}
                                </Field>
                                <ErrorMessage
                                  className="field-error text-danger"
                                  name="money"
                                  component="div"
                                />
                              </FormGroup>
                            </div>
                            <div className="row">
                              <div className="col-6">
                                <FormGroup>
                                  <label htmlFor="numbers">Numeros</label>
                                  <Field
                                    className="form-control"
                                    name="numbers"
                                    placeholder="Numeros"
                                    type="number"
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
                                    placeholder={`Precio`}
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
                                    {user.user.name ?? "Sin nombre"}
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
                  <div className="accordion-container">
                    {allRifas
                      .sort((a, b) => (a.id > b.id ? -1 : 1))
                      .map((element, index) => {
                        return (
                          <div className="accordion" key={index}>
                            <div className="accordion-item">
                              <div className="accordion-title">
                                <div className="col-xs-12 col-4">
                                  <span
                                    style={{
                                      border: "2px",
                                      borderRadius: "100%",
                                      padding: "0 6.5px 0 6.5px",
                                      color: "#fff",
                                    }}
                                    className="bg-primary"
                                  >
                                    {element.id}
                                  </span>{" "}
                                  {`Premio: ${
                                    Number(element.awardSign)
                                      ? `${element.awardSign}$`
                                      : `${element.awardSign}`
                                  }`}
                                </div>
                                <div className="col-xs-12 col-4 text-center rifD">
                                  {element.user.name}
                                </div>
                                <p className="text subtitle text-end">
                                  {element.name}
                                </p>
                                {element.is_send === false ? (
                                  <>
                                    <Modal
                                      btnColor="success"
                                      centered={true}
                                      classBtn="btn btn-sm"
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
                                ) : (
                                  <>
                                  {
                                    element.pin === null ? (
                                      <Modal
                                      btnColor="primary"
                                      centered={true}
                                      classBtn="btn-sm"
                                      buttonTitle="Agregar Pin"
                                      title={`Agregar pin`}
                                    >
                                      <div className="container">
                                        <div className="row">
                                          <div className="col-12 mb-4">
                                            <p className="card-text">
                                              Agregue el pin de seguridad
                                            </p>
                                          </div>
                                          <Formik
                                            initialValues={{
                                              pin1: "",
                                              pin2: "",
                                              pin3: "",
                                              pin4: "",
                                            }}
                                            validationSchema={pinSchema}
                                            onSubmit={(values) => {
                                              let pin =
                                                values.pin1 +
                                                "-" +
                                                values.pin2 +
                                                "-" +
                                                values.pin3;
                                                
                                              let pin2 =
                                                values.pin1 +
                                                "-" +
                                                values.pin2 +
                                                "-" +
                                                values.pin3 +
                                                "-" +
                                                values.pin4;

                                              values.pin4 === "" ? putPin({ pin }, element.id)
                                              : putPin({ pin: pin2 }, element.id)
                                              
                                            }}
                                          >
                                            <Form>
                                              <div className="col-12">
                                                <FormGroup>
                                                  <label htmlFor="pin1">
                                                    Pin
                                                  </label>
                                                  <Field
                                                    className="form-control"
                                                    name="pin1"
                                                    placeholder="11"
                                                    type="number"
                                                  />
                                                  <ErrorMessage
                                                    className="field-error text-danger"
                                                    name="pin1"
                                                    component="div"
                                                  />
                                                </FormGroup>
                                              </div>
                                              <div className="col-12">
                                                <FormGroup>
                                                  <Field
                                                    className="form-control"
                                                    name="pin2"
                                                    placeholder="22"
                                                    type="number"
                                                  />
                                                  <ErrorMessage
                                                    className="field-error text-danger"
                                                    name="pin2"
                                                    component="div"
                                                  />
                                                </FormGroup>
                                              </div>
                                              <div className="col-12">
                                                <FormGroup>
                                                  <Field
                                                    className="form-control"
                                                    name="pin3"
                                                    placeholder="33"
                                                    type="number"
                                                  />
                                                  <ErrorMessage
                                                    className="field-error text-danger"
                                                    name="pin3"
                                                    component="div"
                                                  />
                                                </FormGroup>
                                              </div>
                                              <div className="col-12">
                                                <FormGroup>
                                                  <Field
                                                    className="form-control"
                                                    name="pin4"
                                                    placeholder="(opcional)"
                                                    type="number"
                                                  />
                                                  <ErrorMessage
                                                    className="field-error text-danger"
                                                    name="pin4"
                                                    component="div"
                                                  />
                                                </FormGroup>
                                              </div>
                                              <button
                                                className="btn btn-success w-100"
                                                type="submit"
                                              >
                                                Ingresar PIN
                                              </button>
                                            </Form>
                                          </Formik>
                                        </div>
                                      </div>
                                    </Modal>
                                    ) : (
                                      <>
                                        <Modal 
                                          btnColor="success"
                                          centered={true}
                                          classBtn="btn-sm"
                                          buttonTitle="Completado"
                                          title={`Ver pin`}
                                        >
                                          <h2 className="text-center">{element.pin}</h2>
                                        </Modal>
                                        {
                                          userDetails.user.role === "Admin" ? (
                                          <>
                                            {
                                              element.verify === false ? (
                                                <Modal
                                                  btnColor="warning"
                                                  centered={true}
                                                  classBtn="btn-sm"
                                                  buttonTitle="Verificar"
                                                  title={`Verificar`}
                                                >
                                                  <div className="container">
                                                    <div className="row">
                                                      <div className="col-12 mb-4">
                                                        <p className="card-text">
                                                          Verifique el pin de seguridad: <strong>{element.pin}</strong>
                                                        </p>
                                                      </div>
                                                      <div className="col-6">
                                                        <button
                                                          className="btn btn-success w-100"
                                                          onClick={() => {
                                                            checkValidate(true, element.id);
                                                          }}
                                                        >
                                                          Verificar
                                                        </button>
                                                      </div>
                                                      <div className="col-6">
                                                        <button
                                                          className="btn btn-danger w-100"
                                                          onClick={() => {
                                                            checkValidate(false, element.id);
                                                          }}
                                                        >
                                                          Reiniciar PIN
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </Modal>
                                              ) : (
                                                <button
                                                  className="btn btn-success btn-sm"
                                                >
                                                  ✓
                                                </button>
                                              )
                                            }
                                          </>
                                          ) : null
                                        }
                                      </>
                                    )
                                  }
                                  </>
                                )}
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={handleAccordion.bind(this, index)}
                                >
                                  ▽
                                </button>
                              </div>
                              {isActive === index ? (
                                <div className="accordion-content-open">
                                  <div
                                    className="card mb-2"
                                    style={{
                                      maxWidth: "18rem",
                                      minWidth: "2rem",
                                    }}
                                  >
                                    <div className="card-body">
                                      <img
                                        src={RifaMaxLogo}
                                        alt="Logo"
                                        className="img-fluid"
                                      />
                                      <br />
                                      <p className="text-center">
                                        <strong>
                                          {formatInt(element.numbers)} - SIGNO <br />
                                          {`PRECIO: ${element.price}${element.money}`}
                                        </strong>
                                      </p>
                                      <hr />
                                      <div className="row">
                                        <div className="col-6">
                                          <p className="card-text text-start">
                                            <strong>PREMIO:</strong>
                                          </p>
                                        </div>
                                        <div className="col-6">
                                          <p className="card-text text-end">
                                            <strong>
                                              {Number(element.awardSign)
                                                ? `${element.awardSign}$`
                                                : `${element.awardSign}`}
                                            </strong>
                                          </p>
                                        </div>
                                        {element.plate !== null ? (
                                          <>
                                            <div className="col-6">
                                              <p className="card-text text-start">
                                                <strong>PLACA:</strong>
                                              </p>
                                            </div>
                                            <div className="col-6">
                                              <p className="card-text text-end">
                                                <strong>{element.plate}</strong>
                                              </p>
                                            </div>
                                          </>
                                        ) : null}
                                        {element.year !== null ? (
                                          <>
                                            <div className="col-6">
                                              <p className="card-text text-start">
                                                <strong>MODELO:</strong>
                                              </p>
                                            </div>
                                            <div className="col-6">
                                              <p className="card-text text-end">
                                                <strong>{element.year}</strong>
                                              </p>
                                            </div>
                                          </>
                                        ) : null}
                                        <div className="col-6">
                                          <p className="card-text text-start">
                                            <strong>SIN SIGNO:</strong>
                                          </p>
                                        </div>
                                        <div className="col-6">
                                          <p className="card-text text-end">
                                            <strong>
                                              {Number(element.awardNoSign)
                                                ? `${element.awardNoSign}$`
                                                : `${element.awardNoSign}`}
                                            </strong>
                                          </p>
                                        </div>
                                      </div>
                                      <hr />
                                      <div className="row">
                                        <div className="col-7">
                                          <p className="card-text text-start">
                                            SERIE NUMERO:
                                          </p>
                                        </div>
                                        <div className="col-5">
                                          <p className="card-text text-end">
                                            {element.id}
                                          </p>
                                        </div>
                                        <div className="col-4">
                                          <p className="card-text text-start">
                                            LOTERIA:
                                          </p>
                                        </div>
                                        <div className="col-8">
                                          <p className="card-text text-end">
                                            {element.loteria}
                                          </p>
                                        </div>
                                        <div className="col-6">
                                          <p className="card-text text-start">
                                            FECHA:
                                          </p>
                                        </div>
                                        <div className="col-6">
                                          <p className="card-text text-end">
                                            {Moment(element.rifDate).format(
                                              "DD/MM/YYYY"
                                            )}
                                          </p>
                                          {/* <p className="card-text text-end">
                                            {element.created_at.substring(
                                              0,
                                              10
                                            )}
                                          </p> */}
                                        </div>
                                        <div className="col-6">
                                          <p className="card-text text-start">
                                            HORA:
                                          </p>
                                        </div>
                                        <div className="col-6">
                                          <p className="card-text text-end">
                                            {element.created_at.substring(
                                              11,
                                              19
                                            )}
                                          </p>
                                        </div>
                                        <div className="col-6">
                                          <p className="card-text text-start">
                                            CADUCA:
                                          </p>
                                        </div>
                                        <div className="col-6">
                                          <p className="card-text text-end">
                                            {Moment(element.expired).format(
                                              "DD/MM/YYYY"
                                            )}
                                          </p>
                                        </div>
                                        <div className="col-4">
                                          <p className="card-text text-start">
                                            RIFERO:
                                          </p>
                                        </div>
                                        <div className="col-8">
                                          <p className="card-text text-end">
                                            {element.user.name}
                                          </p>
                                        </div>
                                        <div className="col-6">
                                          <p className="card-text text-start">
                                            TELEFONO:
                                          </p>
                                        </div>
                                        <div className="col-6">
                                          <p className="card-text text-end">
                                            {element.rifero.phone}
                                          </p>
                                        </div>
                                      </div>
                                      <p className="subtitle text-muted mt-4 text-center">
                                        Esto es una representacion de como
                                        luciran los tickets
                                      </p>
                                    </div>
                                  </div>
                                  {element.is_send === true ? (
                                    <>
                                      <div className="row">
                                        <div className="col-12">
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
                                                              {
                                                                ticket.ticket_nro
                                                              }
                                                            </h5>
                                                            <p className="card-text">
                                                              {formatInt(element.numbers)}
                                                              <br />
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
                                        </div>
                                        {/* <div className="col-6">
                                          {element.pin === null ? (
                                            <Modal
                                              btnColor="success"
                                              centered={true}
                                              classBtn="w-100 button-pin"
                                              buttonTitle="Agregar Pin"
                                              title={`Agregar pin`}
                                            >
                                              <div className="container">
                                                <div className="row">
                                                  <div className="col-12 mb-4">
                                                    <p className="card-text">
                                                      Agregue el pin de
                                                      seguridad
                                                    </p>
                                                  </div>
                                                  <Formik
                                                    initialValues={{
                                                      pin1: "",
                                                      pin2: "",
                                                      pin3: "",
                                                    }}
                                                    validationSchema={pinSchema}
                                                    onSubmit={(values) => {
                                                      let pin =
                                                        values.pin1 +
                                                        "-" +
                                                        values.pin2 +
                                                        "-" +
                                                        values.pin3;
                                                      putPin(
                                                        { pin },
                                                        element.id
                                                      );
                                                    }}
                                                  >
                                                    <Form>
                                                      <div className="col-12">
                                                        <FormGroup>
                                                          <label htmlFor="pin1">
                                                            Pin
                                                          </label>
                                                          <Field
                                                            className="form-control"
                                                            name="pin1"
                                                            placeholder="11"
                                                            type="number"
                                                          />
                                                          <ErrorMessage
                                                            className="field-error text-danger"
                                                            name="pin1"
                                                            component="div"
                                                          />
                                                        </FormGroup>
                                                      </div>
                                                      <div className="col-12">
                                                        <FormGroup>
                                                          <Field
                                                            className="form-control"
                                                            name="pin2"
                                                            placeholder="22"
                                                            type="number"
                                                          />
                                                          <ErrorMessage
                                                            className="field-error text-danger"
                                                            name="pin2"
                                                            component="div"
                                                          />
                                                        </FormGroup>
                                                      </div>
                                                      <div className="col-12">
                                                        <FormGroup>
                                                          <Field
                                                            className="form-control"
                                                            name="pin3"
                                                            placeholder="33"
                                                            type="number"
                                                          />
                                                          <ErrorMessage
                                                            className="field-error text-danger"
                                                            name="pin3"
                                                            component="div"
                                                          />
                                                        </FormGroup>
                                                      </div>
                                                      <button
                                                        className="btn btn-success w-100"
                                                        type="submit"
                                                      >
                                                        Ingresar PIN
                                                      </button>
                                                    </Form>
                                                  </Formik>
                                                </div>
                                              </div>
                                            </Modal>
                                          ) : (
                                            <Modal
                                              btnColor="success"
                                              centered={true}
                                              classBtn="w-100 button-pin"
                                              buttonTitle="Ver Pin"
                                              title={`Pin de seguridad`}
                                            >
                                              <p className="card-text">
                                                El pin de seguridad es:{" "}
                                                <strong>{element.pin}</strong>
                                              </p>
                                            </Modal>
                                          )}
                                        </div> */}
                                      </div>
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
                                                      {ticket.is_sold ===
                                                      true ? (
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
                                      <ToastContainer />
                                    </>
                                  )}
                                </div>
                              ) : (
                                <>
                                  <div className="accordion-content-close close">
                                    <div
                                      className="card mb-2"
                                      style={{
                                        maxWidth: "18rem",
                                        minWidth: "2rem",
                                      }}
                                    >
                                      <div className="card-body">
                                        <img
                                          src={RifaMaxLogo}
                                          alt="Logo"
                                          className="img-fluid"
                                        />
                                        <br />
                                        <p className="text-center">
                                          <strong>
                                            {formatInt(element.numbers)} - SIGNO <br />
                                            {`PRECIO: ${element.price}${element.money}`}
                                          </strong>
                                        </p>
                                        <hr />
                                        <div className="row">
                                          <div className="col-6">
                                            <p className="card-text text-start">
                                              <strong>PREMIO:</strong>
                                            </p>
                                          </div>
                                          <div className="col-6">
                                            <p className="card-text text-end">
                                              <strong>
                                                {Number(element.awardSign)
                                                  ? `${element.awardSign}$`
                                                  : `${element.awardSign}`}
                                              </strong>
                                            </p>
                                          </div>
                                          {element.plate !== null ? (
                                            <>
                                              <div className="col-6">
                                                <p className="card-text text-start">
                                                  <strong>PLACA:</strong>
                                                </p>
                                              </div>
                                              <div className="col-6">
                                                <p className="card-text text-end">
                                                  <strong>
                                                    {element.plate}
                                                  </strong>
                                                </p>
                                              </div>
                                            </>
                                          ) : null}
                                          {element.year !== null ? (
                                            <>
                                              <div className="col-6">
                                                <p className="card-text text-start">
                                                  <strong>MODELO:</strong>
                                                </p>
                                              </div>
                                              <div className="col-6">
                                                <p className="card-text text-end">
                                                  <strong>
                                                    {element.year}
                                                  </strong>
                                                </p>
                                              </div>
                                            </>
                                          ) : null}
                                          <div className="col-6">
                                            <p className="card-text text-start">
                                              <strong>SIN SIGNO:</strong>
                                            </p>
                                          </div>
                                          <div className="col-6">
                                            <p className="card-text text-end">
                                              <strong>
                                                {Number(element.awardNoSign)
                                                  ? `${element.awardNoSign}$`
                                                  : `${element.awardNoSign}`}
                                              </strong>
                                            </p>
                                          </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                          <div className="col-7">
                                            <p className="card-text text-start">
                                              SERIE NUMERO:
                                            </p>
                                          </div>
                                          <div className="col-5">
                                            <p className="card-text text-end">
                                              {element.id}
                                            </p>
                                          </div>
                                          <div className="col-4">
                                            <p className="card-text text-start">
                                              LOTERIA:
                                            </p>
                                          </div>
                                          <div className="col-8">
                                            <p className="card-text text-end">
                                              {element.loteria}
                                            </p>
                                          </div>
                                          <div className="col-6">
                                            <p className="card-text text-start">
                                              FECHA:
                                            </p>
                                          </div>
                                          <div className="col-6">
                                            <p className="card-text text-end">
                                              {Moment(element.rifDate).format(
                                                "DD/MM/YYYY"
                                              )}
                                            </p>
                                            {/* <p className="card-text text-end">
                                            {element.created_at.substring(
                                              0,
                                              10
                                            )}
                                          </p> */}
                                          </div>
                                          <div className="col-6">
                                            <p className="card-text text-start">
                                              HORA:
                                            </p>
                                          </div>
                                          <div className="col-6">
                                            <p className="card-text text-end">
                                              {element.created_at.substring(
                                                11,
                                                19
                                              )}
                                            </p>
                                          </div>
                                          <div className="col-6">
                                            <p className="card-text text-start">
                                              CADUCA:
                                            </p>
                                          </div>
                                          <div className="col-6">
                                            <p className="card-text text-end">
                                              {Moment(element.expired).format(
                                                "DD/MM/YYYY"
                                              )}
                                            </p>
                                          </div>
                                          <div className="col-4">
                                            <p className="card-text text-start">
                                              RIFERO:
                                            </p>
                                          </div>
                                          <div className="col-8">
                                            <p className="card-text text-end">
                                              {element.user.name}
                                            </p>
                                          </div>
                                          <div className="col-6">
                                            <p className="card-text text-start">
                                              TELEFONO:
                                            </p>
                                          </div>
                                          <div className="col-6">
                                            <p className="card-text text-end">
                                              {element.rifero.phone}
                                            </p>
                                          </div>
                                        </div>
                                        <p className="subtitle text-muted mt-4 text-center">
                                          Esto es una representacion de como
                                          luciran los tickets
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <ToastContainer />
              </div>
            )
          ) : (
            <div className="card">
              <div className="card-body">
                <div className="accordion">
                  <div className="accordion-item">
                    <hr />
                    <h3 className="not-found">Cargando rifas...</h3>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;
