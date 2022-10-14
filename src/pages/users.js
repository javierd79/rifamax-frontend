/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { PopoverBody } from "reactstrap";
import { Popover, PopoverHeader } from "@chakra-ui/react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { BsFillPersonFill, BsTrash } from "react-icons/bs";
import { useAuthState, useAuthDispatch, logout } from "../context/auth";
import "../assets/scss/pages/users.scss";
import axios from "axios";
import Modal from "../components/modal";
import * as Yup from "yup";
import { Formik, Form, Field, validateYupSchema } from "formik";
import Switch from "react-js-switch";

function Users() {
  const [isOpen, setIsOpen] = useState(false);
  const [pops, setPops] = useState(false);
  const [users, setUsers] = useState([]);
  const [steps, setSteps] = useState(1);
  const [bodyOption, setBodyOption] = useState([]);
  const [option, setOption] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [userPhone, setUserPhone] = useState([]);
  const [agency, setAgency] = useState(null);
  const [control, setControl] = useState(null);

  let setCode = 0;
  let security = Math.floor(Math.random() * 1000000) + 1;
  let verify = false;

  // const prevStep = () => {
  //   setSteps(steps - 1);
  // };

  const nextStep = () => {
    setSteps(steps + 1);
  };

  const qualify = (param) => {
    if (param === "Agencia"){
      setControl(0);
    } else if (param === "Taquilla"){
      setControl(1);
    } else if (param === "Rifero"){
      setControl(2);
    }
  }

  const arrJoins = ['agencies', 'taquilla', 'riferos'];

  // const handleSteps = input => e => {
  //   setSteps({ [input]: e.taget.value });
  // };

  const validateSecurity = (setCode) => {
    if (security === Number(setCode)) {
      return true
    } else {
      return false
    }
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const formScheme = Yup.object().shape({
    name: Yup.string().required("Requerido"),
    username: Yup.string().required("Requerido"),
    email: Yup.string().email("Correo invalido").required("Requerido"),
    role: Yup.string().required("Requerido"),
    password: Yup.string().required("Requerido").min(6, "Muy corta"),
    password_confirmation: Yup.string().required("Requerido").min(6, "Muy corta").equals([Yup.ref("password")], "Las contraseñas no coinciden"),
    status: Yup.boolean().required("Requerido"),
  });

  const joinForm = Yup.object().shape({
    phone: Yup.string().required("Requerido"),
  });

  const userDetails = useAuthState();

  const dispatch = useAuthDispatch();

  const roleSelect = [
    { value: "Admin", label: "Admin" },
    { value: "Rifero", label: "Rifero" },
    { value: "Taquilla", label: "Taquilla" },
    { value: "Agencia", label: "Agencia" },
  ];

  const handleLogout = () => {
    logout(dispatch);
    window.location.href = "/login";
  };

  useEffect(() => {
    axios
      .get("https://rifa-max.com/api/v1/users", {
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDetails.token]);

  const togglePops = () => {
    setPops(!pops);
  };

  const RegisterUser = () => {
    return (
      <div className="register-user">
        <Formik
          initialValues={{
            name: "",
            username: "",
            email: "",
            role: "",
            password: "",
            password_confirmation: "",
            status: true,
          }}
          validationSchema={formScheme}
          onSubmit={(values, { setSubmitting }) => {
            setUser([...user, values]);
            axios.post("https://rifa-max.com/api/v1/users", values, {
              headers: {
                Authorization: `Bearer ${userDetails.token}`,
              },
            });
            setSubmitting(false);
            setOption(values.role.toString());
            qualify(values.role.toString());
            nextStep();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                {errors.name && touched.name ? (
                  <div className="text-danger">{errors.name}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="username">Nombre general</label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                />
                {errors.username && touched.username ? (
                  <div className="text-danger">{errors.username}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                />
                {errors.email && touched.email ? (
                  <div className="text-danger">{errors.email}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                />
                {errors.password && touched.password ? (
                  <div className="text-danger">{errors.password}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="password_confirmation">
                  Confirmar contraseña
                </label>
                <Field
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  className="form-control"
                />
                {errors.password_confirmation &&
                touched.password_confirmation ? (
                  <div className="text-danger">
                    {errors.password_confirmation}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <Field
                  as="select"
                  name="role"
                  id="role"
                  className="form-control"
                >
                  <option disabled value="">
                    Seleccione un Rol
                  </option>
                  {roleSelect.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </Field>
                {errors.role && touched.role ? (
                  <div className="text-danger">{errors.role}</div>
                ) : null}
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary mt-4 w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Siguiente"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <hr className="mt-4"/>
          <p className="text-muted subtitle p-2 text-center"><strong>ADVERTENCIA:<br/></strong>El usuario sera creado al presionar el boton, el siguiente paso es de configuracion.</p>
        <hr className="mb-4"/>
      </div>
    );
  };

  const JoinUsers = () => {
    return (
      <div className="join-users">
        <Formik
          initialValues={{
            phone: "",
            agency_id: Number(agency) === 0 ? null : Number(agency),
          }}
          validationSchema={joinForm}
          onSubmit={(values, { setSubmitting }) => {
            setBodyOption([...bodyOption, values]);
            setSubmitting(false);
            axios.post(`https://rifa-max.com/api/v1/${arrJoins[control]}`, values, {
              headers: {
                Authorization: `Bearer ${userDetails.token}`,
              },
            });
            window.location.reload();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="form-group">
                {option === "Admin" ? (
                  <>
                    <p className="text-center">
                      Esta seguro que desea crear un usuario con privilegios de
                      administrador?
                    </p>
                    <button
                      className="btn btn-primary mt-4 w-100"
                      onClick={() =>
                        axios
                          .post("https://rifa-max.com/api/v1/users", user[0], {
                            headers: {
                              Authorization: `Bearer ${userDetails.token}`,
                            },
                          })
                          .then((res) => {
                            window.location.reload();
                          })
                          .catch((err) => {
                            console.log(err);
                          })
                      }
                    >
                      Crear
                    </button>
                  </>
                ) : null}
                {option !== "Admin" ? (
                  <>
                    <label htmlFor="phone">Telefono</label>
                    <Field
                      type="text"
                      name="phone"
                      id="phone"
                      className="form-control"
                    />
                    {errors.phone && touched.phone ? (
                      <div className="text-danger">{errors.phone}</div>
                    ) : null}
                    { 
                      option === "Taquilla" ? (
                        <>
                          <label htmlFor="agency_id">Agencia</label>
                          <Field 
                            as="select"
                            name="agency_id"
                            id="agency_id"
                            className="form-control"
                            onChange={(e) => {
                              setAgency(e.target.value);
                            }}
                          >
                            <option disabled value="1">
                              Seleccione una agencia
                            </option>
                            {users.map((user) => (
                              user.role === "Agencia" ? (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ) : null
                            ))}
                          </Field>
                          {errors.agency_id && touched.agency_id ? (
                            <div className="text-danger">{errors.agency_id}</div>
                          ) : null}
                        </>
                      ) : null
                    }
                  </>
                ) : null}
              </div>
              <div className="form-group">
                <button
                  className={`btn btn-primary mt-4 w-100 ${
                    option === "Admin" ? "d-none" : ""
                  }`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Siguiente"}
                </button> 
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  const RenderSteps = () => {
    switch (steps) {
      case 1:
        return <RegisterUser />;
      case 2:
        return <JoinUsers />;
      default:
        return <RegisterUser />;
    }
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
        <div className="container-fluid users">
          {users.length === 0 ? (
            <div className="card">
              <div className="card-body">
                <div className="accordion">
                  <div className="accordion-item">
                    <hr />
                    <h2 className="not-found" id="headingOne">
                      No hay usuarios
                    </h2>
                    <hr />
                  </div>
                </div>
                <Modal
                  btnColor="primary"
                  centered={true}
                  classBtn="mb-1"
                  buttonTitle="Agregar usuario"
                  title="Agregar usuario"
                >
                  <RenderSteps />
                </Modal>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title title">Usuarios</h5>
                <hr />
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Status</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .sort((a, b) => a.id - b.id)
                        .map((user) => (
                          <tr key={user.id}>
                            <th scope="row" className="body-item">
                              {user.id}
                            </th>
                            <td className="body-item">{user.name}</td>
                            <td className="body-item">{user.email}</td>
                            <td className="body-item">{user.role}</td>
                            <td className="body-item">
                              <Switch
                                value={user.status}
                                color="#fff"
                                onChange={() => {
                                  axios
                                    .put(
                                      `https://rifa-max.com/api/v1/users/${user.id}`,
                                      {
                                        status: !user.status,
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
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }}
                              />
                            </td>
                            <td className="body-btn">
                              <Modal
                                btnColor="danger"
                                centered={true}
                                classBtn="mb-1"
                                buttonTitle=<BsTrash />
                                title="Estas seguro de eliminar este usuario?"
                              >
                                <h6>
                                  Una vez eliminado este usuario se borraran
                                  todos su atributos relacionados: Rifas,
                                  Sorteos, Agencias, Riferos, Taquilla.
                                  <br />
                                  {/* <br />
                                  Ingrese el codigo de seguridad:{" "}
                                  <strong>
                                    {security}
                                  </strong>{" "}
                                  para continuar.
                                </h6>
                                <hr />
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) =>
                                    {(setCode = e.target.value) && (validateSecurity(e.target.value))}
                                    
                                  }
                                  
                                  /> */}
                                </h6>
                                  
                                {
                                  
                                    validateSecurity(setCode) === false ? (
                                        <button
                                          className="btn btn-danger w-100 mt-4"
                                          onClick={() => {
                                            axios
                                              .delete(
                                                `https://rifa-max.com/api/v1/users/${user.id}`,
                                                {
                                                  headers: {
                                                    Authorization: `Bearer ${userDetails.token}`,
                                                  },
                                                }
                                              )
                                              .then((res) => {
                                                window.location.reload();
                                              })
                                              .catch((err) => {
                                                console.log(err);
                                              });
                                          }}
                                        >
                                          
                                          Eliminar
                                        </button>
                                      )
                                      : (
                                        <button
                                          className="btn btn-danger w-100 mt-4"
                                          disabled
                                        >
                                          Eliminar
                                        </button>
                                      )
                                }
                              </Modal>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <Modal
                    btnColor="primary"
                    centered={true}
                    classBtn="mb-1"
                    buttonTitle="Agregar usuario"
                    title="Agregar usuario"
                  >
                    <RenderSteps />
                  </Modal>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Users;