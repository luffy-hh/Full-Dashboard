import React from "react";

import styles from "../ToDeposit.module.css";
import {
  setShowDepoForm,
  setBankNameIds,
  setPostDeposit,
} from "../../../Feactures/bankApiSlice";
import { useDispatch } from "react-redux";
import { BiSolidCopy } from "react-icons/bi";

function BankAccountList({ bankAccList }) {
  const dispatch = useDispatch();

  const handleCopy = () => {
    const copyContent = document.getElementById("account_no");
    const textToCopy = copyContent.innerText;
    navigator.clipboard.writeText(textToCopy);
    alert("Succeeded Copy Account No");
  };

  const handleAccount = (id) => {
    console.log(id);
    dispatch(setShowDepoForm());
    dispatch(setBankNameIds(id));
    dispatch(setPostDeposit());
  };

  const list = bankAccList?.map((d) => (
    <li key={d._id} onClick={() => handleAccount(d.bankNameData._id)}>
      <div className={`btn_hover ${styles.bank_acc_btn}`}>
        <span> {d.bankNameData.bankName}</span>
        <span> {d.account_name}</span>
        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span id="account_no">{d.account}</span>
          <button className={styles.copy_btn} onClick={() => handleCopy()}>
            <BiSolidCopy />
          </button>
        </p>
      </div>
    </li>
  ));
  return (
    <div className={styles.bank_acc_list}>
      <p>All Bank Account List</p>
      <ul className={styles.bank_acc}> {list}</ul>
    </div>
  );
}

export default BankAccountList;
