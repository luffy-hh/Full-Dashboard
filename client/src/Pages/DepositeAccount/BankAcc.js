import React, { useEffect, useState } from "react";
import NormalButton from "../../Component/NormalButton";
import { useDispatch, useSelector } from "react-redux";
import { setModalBankAcc } from "../../Feactures/modalSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import {
  fetGetBankName,
  selectPostBankName,
  selectBankName,
  fetGetBankAcc,
  selectBankAcc,
  selectPostBankAcc,
} from "../../Feactures/bankApiSlice";
import { selectBankAccHead } from "../../Feactures/AllUserPageSlice";

import styles from "../DepositeType/DepositeType.module.css";
import BankAccBox from "../../Component/CustomBox/BankAccBox";
import Tables from "../../Component/Tables";

function BankAcc() {
  const dispatch = useDispatch();
  const postBankName = useSelector(selectPostBankName);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const bankAcc = useSelector(selectBankAcc);
  const postBankAcc = useSelector(selectPostBankAcc);
  const bankName = useSelector(selectBankName);
  const bankAccHead = useSelector(selectBankAccHead);

  useEffect(() => {
    dispatch(fetGetBankName({ api: "bankName", accessToken }));
  }, [postBankName]);

  useEffect(() => {
    dispatch(fetGetBankAcc({ api: "bankAccMe", accessToken }));
  }, [postBankAcc]);

  const bankNameArr = bankName?.data.allBankName;
  const bankAccArr = bankAcc?.data.allBankAcc;

  const list = bankAccArr?.map((d, i) => (
    <tr key={d._id} className={styles.deposite_tr_style}>
      <td>{i + 1}</td>
      <td>{d.bankNameData.bankName}</td>
      <td>{d.account_name}</td>
      <td>{d.account}</td>
      <td>logo</td>
      <td className={styles.description}>{d.description}</td>
      <td>
        <NormalButton className={styles.deposite_edit_btn}>Edit</NormalButton>
      </td>
    </tr>
  ));

  return (
    <>
      <BankAccBox bankName={bankNameArr} />
      <div
        className={`page_style ${styles.deposite_page}`}
        style={{ overflow: "hidden" }}
      >
        <div className={`box_shadow ${styles.deposite_container}`}>
          <p>Bank Account</p>
          <NormalButton
            className={styles.deposite_create_btn}
            onClick={() => dispatch(setModalBankAcc(true))}
          >
            Create
          </NormalButton>
        </div>

        <div className={`hide_scroll table_d_container ${styles.bank_acc}`}>
          <Tables thead={bankAccHead} tbody={list} />
        </div>
      </div>
    </>
  );
}

export default BankAcc;
