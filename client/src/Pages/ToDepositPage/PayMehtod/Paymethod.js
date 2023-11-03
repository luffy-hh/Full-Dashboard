import React from "react";

import { useSelector, useDispatch } from "react-redux";
import NormalButton from "../../../Component/NormalButton";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import styles from "../ToDeposit.module.css";

function Paymethod({
  sideData,
  bankNameList,
  changeBank,
  isShow,
  changeAcc,
  bankAccList,
  setShowName,
  setClickName,
}) {
  const dispatch = useDispatch();

  const sideList = sideData?.map((d) => (
    <li
      className={d.show ? styles.active : ""}
      onClick={() => dispatch(changeBank({ id: d._id, name: d.name }))}
      key={d._id}
    >
      <span> {d.name}</span>
    </li>
  ));

  const methodList = bankNameList?.map((d) => (
    <NormalButton
      onClick={() => dispatch(changeAcc({ id: d._id, name: d.name }))}
      className={`btn_hover ${styles.pay_btn}`}
      key={d._id}
    >
      {d.name}
    </NormalButton>
  ));

  const allBankAcc = bankAccList?.map((d) => (
    <NormalButton
      onClick={() =>
        dispatch(setClickName({ name: d.name, id: d.bankNameId._id }))
      }
      className={`btn_hover ${styles.pay_btn}`}
      key={d._id}
    >
      {d.account_name}
    </NormalButton>
  ));

  return (
    <div className={styles.paymethod_container}>
      <ul>{sideList}</ul>
      {isShow ? (
        <div className={styles.card_container}>
          <p>All Bank Name</p>
          <div className={styles.card_box}>{methodList}</div> :
        </div>
      ) : (
        <div className={styles.card_container}>
          <div className={styles.card_head_back}>
            <p>All Bank Account</p>
            <span
              onClick={() => dispatch(setShowName(true))}
              className={styles.back_icon}
            >
              <IoArrowBackCircleSharp />
            </span>
          </div>
          <div className={styles.card_box}>{allBankAcc}</div> :
        </div>
      )}
    </div>
  );
}

export default Paymethod;
