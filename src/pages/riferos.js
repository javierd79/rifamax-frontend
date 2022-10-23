import React, { useState, useEffect } from "react";
import { PopoverBody } from "reactstrap";
import { Popover, PopoverHeader } from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Modal from "../components/modal";
import { useAuthState, useAuthDispatch, logout } from "../context/auth";
import "../assets/scss/pages/riferos.scss";
import "../assets/scss/index.scss";
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form, Field } from "formik";

const Riferos = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pops, setPops] = useState(false);
  const [riferos, setRiferos] = useState([]);
  const [user, setUser] = useState([]);
  const [steps, setSteps] = useState(1);
  const [option, setOption] = useState(null);
  const [bodyOption, setBodyOption] = useState([]);

  const userDetails = useAuthState();

  const dispatch = useAuthDispatch();

  const URL = 'https://rifa-max.com';

  const handleLogout = () => {

    logout(dispatch);
    window.location.href = "/login";
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const togglePops = () => {
    setPops(!pops);
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

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    axios.get(`${URL}/api/v1/riferos`, {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      }, signal 
    })
      .then(res => {
        setRiferos(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    return () => {
      controller.abort();
    }
  }, [userDetails.token]);

  const nextStep = () => {
    setSteps(steps + 1);
  };

  const formScheme = Yup.object().shape({
    name: Yup.string().required("Requerido"),
    username: Yup.string().required("Requerido"),
    email: Yup.string().email("Correo invalido").required("Requerido"),
    cedula: Yup.string().required("Requerido").max(10, "Maximo 10 caracteres").min(8, "Minimo 8 caracteres").matches(/^[V|E|J|P][0-9]{5,9}$/, 'Debe incluir V E J o P'),
    role: Yup.string(),
    password: Yup.string().required("Requerido").min(6, "Muy corta"),
    password_confirmation: Yup.string().required("Requerido").min(6, "Muy corta").equals([Yup.ref("password")], "Las contraseñas no coinciden"),
    status: Yup.boolean().required("Requerido"),
  });

  const joinForm = Yup.object().shape({
    phone: Yup.string().required("Requerido"),
  });
  
  const RegisterUser = () => {
    return (
      <div className="register-user">
        <Formik
          initialValues={{
            name: "",
            username: "",
            email: "",
            cedula: "",
            role: "Rifero",
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
            setOption('Rifero');
            nextStep();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <Field
                  autocomplete="off"
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
                <label htmlFor="username">Nombre Agencia</label>
                <Field
                  autocomplete="off"
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
                <label htmlFor="cedula">Cedula/RIF</label>
                <Field
                  autocomplete="off"
                  type="text"
                  name="cedula"
                  id="cedula"
                  className="form-control"
                />
                {errors.cedula && touched.cedula ? (
                  <div className="text-danger">{errors.cedula}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo</label>
                <Field
                  autocomplete="off"
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
                  autocomplete="off"
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
                  autocomplete="off"
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
          }}
          validationSchema={joinForm}
          onSubmit={(values, { setSubmitting }) => {
            setBodyOption([...bodyOption, values]);
            setSubmitting(false);
            axios.post("https://rifa-max.com/api/v1/riferos", values, {
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
        <div className="container-fluid riferos">
          <div className="card">
            <div className="card-body">
              {riferos.length === 0 ? (
                <div className="accordion">
                  <div className="accordion-item">
                    <hr />
                    <h2 className="not-found" id="headingOne">
                      No hay riferos
                    </h2>
                    <hr />
                  </div>
                </div>
              ) : <>
                    <h5 className="card-title title">Riferos</h5>
                    <hr />
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Cedula</th>
                            <th scope="col">Rol</th>
                          </tr>
                        </thead>
                        <tbody>
                        {riferos
                          .sort((a, b) => a.id - b.id)
                          .map((user) => (
                            <tr key={user.id}>
                              <th scope="row" className="body-item">
                                {user.id}
                              </th>
                              <td className="body-item">{user.user.name}</td>
                              <td className="body-item">{user.user.email}</td>
                              <td className="body-item">{user.user.cedula}</td>
                              <td className="body-item">Rifero</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                }
              <Modal
                btnColor="primary"
                centered={true}
                classBtn="mb-1"
                buttonTitle="Agregar rifero"
                title="Agregar rifero"
              >
                <RenderSteps />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Riferos;
