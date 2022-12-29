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
import Layout from "../components/_layout";

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
    <Layout>
      <div style={{ position: 'absolute', top: '50%', textAlign: 'center', width: '100%', fontSize: '25px', fontWeight: '900' }}>
        En desarrollo...
      </div>
    </Layout>
  );
}

export default Home;
