import React from "react";
import styles from "./UserBtn.module.css";
import UserBtn from "./UserBtn";
import {
  setModalShow,
  setUserId,
  setCondition,
} from "../../Feactures/modalSlice";
import { useDispatch } from "react-redux";
import { MdAdd } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";

import { BsGraphUpArrow } from "react-icons/bs";
import { MdStorage } from "react-icons/md";
import { FiKey } from "react-icons/fi";
import { LuSwords } from "react-icons/lu";

import { BsLockFill } from "react-icons/bs";

const adminData = [
  { icon: <MdStorage />, text: "Log" },
  { icon: <FiKey />, text: "Password" },
  { icon: <BsLockFill />, text: "Active" },
];

function AllusersFun({ data, toId }) {
  const handleDepo = (text) => {
    dispatch(setModalShow(true));
    dispatch(setUserId(toId));
    dispatch(setCondition(text));
  };

  const handleWithdraw = (text) => {
    dispatch(setModalShow(true));
    dispatch(setUserId(toId));
    dispatch(setCondition(text));
  };
  const userFunBtn = [
    { icon: <MdAdd />, text: "DEP", fun: handleDepo }, //addd
    { icon: <AiOutlineMinus />, text: "WDL", fun: handleWithdraw }, //withdraw out
    { icon: <LuSwords />, text: "Action" },
    { icon: <BsGraphUpArrow />, text: "Report" },
    { icon: <MdStorage />, text: "Log" },
    { icon: <FiKey />, text: "Password" },
    { icon: <BsLockFill />, text: "Active" },
  ];

  const datas = data === "admin" ? adminData : userFunBtn;
  const dispatch = useDispatch();
  const btnData = datas.map((d) => (
    <UserBtn onClick={() => d.fun(d.text)} key={d.text}>
      <span className={styles.user_fun_icon}>{d.icon}</span>
      <span className={styles.user_fun_btn_dirc}>{d.text}</span>
    </UserBtn>
  ));
  return <td className={styles.user_fun_btn_container}>{btnData}</td>;
}

export default AllusersFun;
