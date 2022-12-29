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
import Users from "../pages/users";

// import Modal from '../components/modal';
// import RifaGenerator from "../components/rifaGenerator";

function Layout({ children }) {
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
        {
          children
        }
      </div>
    </>
  );
}

export default Layout;
