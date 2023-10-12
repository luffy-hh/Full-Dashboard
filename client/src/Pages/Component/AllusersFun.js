import React from "react";
import styles from "./UserBtn.module.css";
import UserBtn from "./UserBtn";
import { setModalShow } from "../../Feactures/modalSlice";
import { useDispatch } from "react-redux";
import { MdAdd } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdStorage } from "react-icons/md";
import { FiKey } from "react-icons/fi";

import { BsLockFill } from "react-icons/bs";
import { BiSolidMessageDetail } from "react-icons/bi";

const adminData = [
  { icon: <MdStorage />, text: "Log" },
  { icon: <FiKey />, text: "Password" },
  { icon: <BsLockFill />, text: "Active" },
  { icon: <BiSolidMessageDetail />, text: "Detail" },
];

function AllusersFun({ data }) {
  const handleDepo = () => {
    dispatch(setModalShow(true));
  };
  const userFunBtn = [
    { icon: <MdAdd />, text: "DEP", fun: handleDepo }, //addd
    { icon: <AiOutlineMinus />, text: "WDL" }, //withdraw out
    { icon: <BsPersonCircle />, text: "Player" },
    { icon: <BsGraphUpArrow />, text: "Report" },
    { icon: <MdStorage />, text: "Log" },
    { icon: <FiKey />, text: "Password" },
    { icon: <BsLockFill />, text: "Active" },
    { icon: <BiSolidMessageDetail />, text: "Detail" },
  ];

  const datas = data === "admin" ? adminData : userFunBtn;
  const dispatch = useDispatch();
  const btnData = datas.map((d) => (
    <UserBtn onClick={() => d.fun()} key={d.text}>
      <span className={styles.user_fun_icon}>{d.icon}</span>
      <span className={styles.user_fun_btn_dirc}>{d.text}</span>
    </UserBtn>
  ));
  return <td className={styles.user_fun_btn_container}>{btnData}</td>;
}

export default AllusersFun;
