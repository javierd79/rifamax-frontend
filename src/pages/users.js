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
import { Formik, Form, Field } from "formik";
import Switch from "react-js-switch";
import { render } from "@testing-library/react";

function Users() {
  const [isOpen, setIsOpen] = useState(false);
  const [pops, setPops] = useState(false);
  const [users, setUsers] = useState([]);
  const [steps, setSteps] = useState(1);
  const [bodyOption, setBodyOption] = useState([]);
  const [option, setOption] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState([]);
  let user_obj;

  // const prevStep = () => {
  //   setSteps(steps - 1);
  // };

  const nextStep = () => {
    setSteps(steps + 1);
  };

  // const handleSteps = input => e => {
  //   setSteps({ [input]: e.taget.value });
  // };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const formScheme = Yup.object().shape({
    name: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    role: Yup.string().required("Required"),
    password: Yup.string().required("Required").min(6, "Muy corta"),
    password_confirmation: Yup.string().required("Required").min(6, "Muy corta").equals([Yup.ref("password")], "Las contraseñas no coinciden"),
    status: Yup.boolean().required("Required"),
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

  const handleSwitch = (e) => {
    return e
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
            setSubmitting(false);
            if (values.role === "Admin") {
              setOption('Admin');
            }
            console.log(user);
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
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                id="password"
                className="form-control" />
              {errors.password && touched.password ? (
                <div className="text-danger">{errors.password}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <Field
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                className="form-control" />
              {errors.password_confirmation && touched.password_confirmation ? (
                <div className="text-danger">{errors.password_confirmation}</div>
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
                <option disabled value="">Seleccione un Rol</option>
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

  const JoinUsers = () => {
    return (
      <div className="join-users">
          <Formik
            initialValues={{
              phone: "",
            }}
            validationSchema={formScheme}
            onSubmit={(values, { setSubmitting }) => {
              setBodyOption(bodyOption.push(values));
              setSubmitting(false);
              console.log(bodyOption);
              nextStep();
              window.location.reload();
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="form-group">
                    {
                      option === 'Admin' ? null :
                      (
                        <>
                        <label htmlFor="Opcion">Opcion</label>
                          <Field
                            as="select"
                            name="option"
                            id='role'
                            className="form-control"
                            onChange={(e) => setOption(e.target.value)}
                          >
                            <option value="">Seleccione una seccion</option>
                            <option value="Agencia">Agencia</option>
                            <option value="Taquilla">Taquilla</option>
                            <option value="Rifero">Rifero</option>
                          </Field>
                        </>
                      )
                    }
                  {errors.option && touched.option ? (
                    <div className="text-danger">{errors.option}</div>
                  ) : null}
                </div>
                {option === "Agencia" ? (
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <Field
                      type="text"                                                                                                       
                      name="phone"
                      id="phone"
                      className="form-control"
                    />
                    {errors.phone && touched.phone ? (
                      <div className="text-danger">{errors.phone}</div>
                    ) : null}
                  </div>
                ) : null}
                {option === "Taquilla" ? (
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <Field
                      type="text"
                      name="phone"
                      id="phone"
                      className="form-control"
                    />
                    {errors.phone && touched.phone ? (
                      <div className="text-danger">{errors.phone}</div>
                    ) : null}
                  </div>
                ) : null}
                {option === "Rifero" ? (
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <Field
                      type="text"
                      name="phone"
                      id="phone"
                      className="form-control"
                    />
                    {errors.phone && touched.phone ? (
                      <div className="text-danger">{errors.phone}</div>
                    ) : null}
                  </div>
                ) : null}
                {option === "Admin" ? (
                  <>
                    <p className="text-center">Esta seguro que desea crear un usuario con privilegios de administrador?</p>
                    <button className="btn btn-primary mt-2" onClick={() => (
                      axios.post('http://159.203.76.114/api/v1/users', user[0],
                      {
                        headers: {
                          'Authorization': `Bearer ${userDetails.token}`
                          }
                          })
                          .then(res => {
                            console.log(res);
                            console.log(res.data);
                          })
                          .catch(err => {
                            console.log(err);
                            console.log(user);
                          })
                      )}
                    >
                      Crear
                    </button>
                  </>
                ) : null}
                <div className="form-group">
                  <button
                    className={`btn btn-primary mt-2 ${option === "Admin" ? "d-none" : ""}`}
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
        return (
          <RegisterUser/>
        );
      case 2:
        return (
          <JoinUsers/>
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
                      {users.sort((a, b) => a.id - b.id).map((user) => (
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
