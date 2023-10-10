import React from "react";
import styles from "./UserBtn.module.css";
import UserBtn from "./UserBtn";

import { MdAdd } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdStorage } from "react-icons/md";
import { FiKey } from "react-icons/fi";

import { BsLockFill } from "react-icons/bs";
import { BiSolidMessageDetail } from "react-icons/bi";

const userFunBtn = [
  { icon: <MdAdd />, text: "DEP" },
  { icon: <AiOutlineMinus />, text: "WDL" },
  { icon: <BsPersonCircle />, text: "Player" },
  { icon: <BsGraphUpArrow />, text: "Report" },
  { icon: <MdStorage />, text: "Log" },
  { icon: <FiKey />, text: "Password" },
  { icon: <BsLockFill />, text: "Active" },
  { icon: <BiSolidMessageDetail />, text: "Detail" },
];

const adminData = [
  { icon: <MdStorage />, text: "Log" },
  { icon: <FiKey />, text: "Password" },
  { icon: <BsLockFill />, text: "Active" },
  { icon: <BiSolidMessageDetail />, text: "Detail" },
];

function AllusersFun({ data }) {
  const datas = data === "admin" ? adminData : userFunBtn;

  const btnData = datas.map((d) => (
    <UserBtn key={d.text}>
      <span className={styles.user_fun_icon}>{d.icon}</span>
      <span className={styles.user_fun_btn_dirc}>{d.text}</span>
    </UserBtn>
  ));
  return <td className={styles.user_fun_btn_container}>{btnData}</td>;
}

export default AllusersFun;
