import React from "react";
import styles from "./UserBtn.module.css";
import UserBtn from "./UserBtn";
import {
  setModalShow,
  setUserId,
  setCondition,
  setModalActive,
  setUserObj,
  setBeforeAmt,
  setModalChangePassword,
  setModalLog,
} from "../../Feactures/modalSlice";
import {
  selectlogInData,
  fetGetTransationRecord,
} from "../../Feactures/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdAdd } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";

import { BsGraphUpArrow } from "react-icons/bs";
import { MdStorage } from "react-icons/md";
import { FiKey } from "react-icons/fi";

import { BsLockFill } from "react-icons/bs";

const adminData = [
  { icon: <MdStorage />, text: "Log" },
  { icon: <FiKey />, text: "Password" },
  { icon: <BsLockFill />, text: "Active" },
];

function AllusersFun({ data, toId, userObj }) {
  const logInData = useSelector(selectlogInData);

  const accessToken = logInData.token;
  const role = logInData.user.role;
  console.log(role);
  const handleDepo = (text) => {
    dispatch(setModalShow(true));
    dispatch(setUserId(toId));
    dispatch(setCondition(text));
    dispatch(setBeforeAmt(userObj.unit));
  };

  const handleWithdraw = (text) => {
    dispatch(setModalShow(true));
    dispatch(setUserId(toId));
    dispatch(setCondition(text));
    dispatch(setBeforeAmt(userObj.unit));
  };

  const handleAction = () => {
    alert("This function is not avaliable");
  };

  const handleLog = () => {
    dispatch(setModalLog(true));
    dispatch(setUserObj(userObj));
    dispatch(
      fetGetTransationRecord({
        api: `transaction-record?user_id=${userObj?._id}&type[in]=receive-from-other,send-to-other,deposit-confirmed,deposit-canceled,withdrawal-confirmed,withdrawal-cancled,deposit-received,withdrawal-requested,withdrawal-canceled-refunded,withdrawal-confirm-from-admin&page=1&limit=10`,
        accessToken,
      })
    );
  };

  const handleChangePassword = () => {
    dispatch(setModalChangePassword(true));
    dispatch(setUserObj(userObj));
  };

  const handleActive = () => {
    dispatch(setModalActive(true));
    dispatch(setUserObj(userObj));
  };

  const userFunBtn = [
    { icon: <MdAdd />, text: "DEP", fun: handleDepo }, //addd
    { icon: <AiOutlineMinus />, text: "WDL", fun: handleWithdraw }, //withdraw out
    { icon: <BsGraphUpArrow />, text: "Report", fun: handleAction },
    { icon: <MdStorage />, text: "Log", fun: handleLog },
    { icon: <FiKey />, text: "Password", fun: handleChangePassword },
    { icon: <BsLockFill />, text: "Active", fun: handleActive },
  ];

  const masterFun = [
    { icon: <BsGraphUpArrow />, text: "Report", fun: handleAction },
    { icon: <MdStorage />, text: "Log", fun: handleLog },
    { icon: <FiKey />, text: "Password", fun: handleChangePassword },
    { icon: <BsLockFill />, text: "Active", fun: handleActive },
  ];

  const agentfun = [
    { icon: <MdAdd />, text: "DEP", fun: handleDepo }, //addd

    { icon: <BsGraphUpArrow />, text: "Report", fun: handleAction },
    { icon: <MdStorage />, text: "Log", fun: handleLog },

    { icon: <BsLockFill />, text: "Active", fun: handleActive },
  ];

  const datas = data === "admin" ? adminData : userFunBtn;
  const finalData =
    role === "Admin" ? datas : role === "Master" ? masterFun : agentfun;

  const dispatch = useDispatch();
  const btnData = finalData.map((d) => (
    <UserBtn onClick={() => d.fun(d.text)} key={d.text}>
      <span className={styles.user_fun_icon}>{d.icon}</span>
      <span className={styles.user_fun_btn_dirc}>{d.text}</span>
    </UserBtn>
  ));
  return <td className={styles.user_fun_btn_container}>{btnData}</td>;
}

export default AllusersFun;
