import React from "react";
import {
  selectPayMentMethod,
  changeActive,
} from "../../../Feactures/AllUserPageSlice";
import { useSelector, useDispatch } from "react-redux";
import NormalButton from "../../../Component/NormalButton";
import styles from "../ToDeposit.module.css";

function Paymethod() {
  const paymethod = useSelector(selectPayMentMethod);
  const dispatch = useDispatch();

  const sideList = paymethod.map((d) => (
    <li
      className={d.show ? styles.active : ""}
      onClick={() => dispatch(changeActive(d.method))}
      key={d.method}
    >
      <span> {d.method}</span>
    </li>
  ));

  const methodList = paymethod[0].pay.map((d) => (
    <NormalButton className={`btn_hover ${styles.pay_btn}`} key={d}>
      {d}
    </NormalButton>
  ));
  const bankList = paymethod[1].pay.map((d) => (
    <NormalButton className={`btn_hover ${styles.pay_btn}`} key={d}>
      {d}
    </NormalButton>
  ));

  const onlinelist = paymethod[2].pay.map((d) => (
    <NormalButton className={`btn_hover ${styles.pay_btn}`} key={d}>
      {d}
    </NormalButton>
  ));

  return (
    <div className={styles.paymethod_container}>
      <ul>{sideList}</ul>
      <div className={styles.card_container}>
        <p>Recommand Methods</p>
        <div className={styles.card_box}>
          {paymethod[0].show && methodList}
          {paymethod[1].show && bankList}
          {paymethod[2].show && onlinelist}
        </div>
      </div>
    </div>
  );
}

export default Paymethod;
