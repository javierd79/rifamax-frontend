import React, { useState, useEffect } from "react";
import { PopoverBody } from "reactstrap";
import { Popover, PopoverHeader } from "@chakra-ui/react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { BsFillPersonFill, BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useAuthState, useAuthDispatch, logout } from "../context/auth";
import "../assets/scss/pages/users.scss";
import axios from "axios";
import Modal from "../components/modal";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Switch from "react-js-switch";

function Users() {
  const [isOpen, setIsOpen] = useState(false);
  const [pops, setPops] = useState(false);
  const [users, setUsers] = useState([]);
  const [steps, setSteps] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  const prevStep = () => {
    setSteps(steps - 1);
  };

  const nextStep = () => {
    setSteps(steps + 1);
  };

  const handleSteps = input => e => {
    setSteps({ [input]: e.taget.value });
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const formScheme = Yup.object().shape({
    name: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    role: Yup.string().required("Required"),
    status: Yup.boolean().required("Required"),
  });

  const userDetails = useAuthState();

  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    logout(dispatch);
    window.location.href = "/login";
  };

  useEffect(() => {
    axios
      .get("http://159.203.76.114/api/v1/users", {
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
            status: false,
          }}
          validationSchema={formScheme}
          onSubmit={(values) => {
            setUser(values)
            nextStep();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="form-control" />
                {errors.name && touched.name ? (
                  <div className="text-danger">{errors.name}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  className="form-control" />
                {errors.username && touched.username ? (
                  <div className="text-danger">{errors.username}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="form-control" />
                {errors.email && touched.email ? (
                  <div className="text-danger">{errors.email}</div>
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
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Agencia">Agencia</option>
                  <option value="Taquilla">Taquilla</option>
                  <option value="Rifero">Rifero</option>
                </Field>
                {errors.role && touched.role ? (
                  <div className="text-danger">{errors.role}</div>
                ) : null}
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Submit"}
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
        return (
          <RegisterUser/>
        );
      case 2:
        return (
          <h1>a</h1>
          // <JoinUsers/>
        );
      case 3:
        return (
          <h1>v</h1>
          // <SendData/>
        );
      case 4:
        return (
          <h1>g</h1>
          // <Success/>
        );
      default:
        return (
          <RegisterUser/>
        );
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
                    {users.map((user) => (
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
                            backgroundColor="#231f20"
                            on
                            handleDiameter={30}
                            onChange={() => {
                              axios
                                .put(
                                  `http://159.203.76.114/api/v1/users/${user.id}`,
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
                                  console.log(res);
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
                              Una vez eliminado este usuario se borraran todos
                              su atributos relacionados: Rifas, Sorteos,
                              Agencias, Riferos, Taquilla
                            </h6>
                            <button
                              className="btn btn-danger w-100 mt-4"
                              onClick={() => {
                                axios
                                  .delete(
                                    `http://159.203.76.114/api/v1/users/${user.id}`,
                                    {
                                      headers: {
                                        Authorization: `Bearer ${userDetails.token}`,
                                      },
                                    }
                                  )
                                  .then((res) => {
                                    console.log(res);
                                    window.location.reload();
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              }}
                            >
                              Eliminar
                            </button>
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
                  <RenderSteps/>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
