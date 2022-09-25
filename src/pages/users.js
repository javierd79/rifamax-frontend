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

function Users() {
  const [isOpen, setIsOpen] = useState(false);
  const [pops, setPops] = useState(false);
  const [users, setUsers] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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

  return (
    <>
      <Sidebar isOpen={isOpen} />
      <div className={isOpen === true ? "openContainer" : "closeContainer"}>
      <button className="btn-flotante">+</button>
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
                          {user.status ? (
                            <span className="badge-activo badge">Activo</span>
                          ) : (
                            <span className="badge-inactivo badge">Inactivo</span>
                          )}
                        </td>
                        <td className="body-btn">
                          <Modal
                            btnColor="primary"
                            centered={true}
                            classBtn="me-1 mb-1"
                            buttonTitle=<FaEdit />
                            title="Editar usuario"
                          >
                            <h6>
                              Una vez eliminado este usuario se borraran todos
                              su atributos relacionados: Rifas, Sorteos,
                              Agencias, Riferos, Taquilla
                            </h6>
                            <button className="btn btn-danger w-100">
                              Eliminar
                            </button>
                          </Modal>
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
                            <button className="btn btn-danger w-100">
                              Eliminar
                            </button>
                          </Modal>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
