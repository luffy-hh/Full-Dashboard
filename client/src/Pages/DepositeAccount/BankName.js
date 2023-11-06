import React, { useEffect } from "react";
import { setModalAccDepo } from "../../Feactures/modalSlice";
import Tables from "../../Component/Tables";
import {
  fetGetBankType,
  selectBankType,
  selectPostBankType,
  fetGetBankName,
  selectPostBankName,
  selectBankName,
} from "../../Feactures/bankApiSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import { selectBankNameHead } from "../../Feactures/AllUserPageSlice";
import { useDispatch, useSelector } from "react-redux";
import NormalButton from "../../Component/NormalButton";
import styles from "../DepositeType/DepositeType.module.css";
import DepositeAccBox from "../../Component/CustomBox/DepositeAccBox";

function BankName() {
  const dispatch = useDispatch();
  const bankType = useSelector(selectBankType);
  const postBankType = useSelector(selectPostBankType);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const postBankName = useSelector(selectPostBankName);
  const bankName = useSelector(selectBankName);
  const bankNameHead = useSelector(selectBankNameHead);

  useEffect(() => {
    dispatch(fetGetBankType({ api: "banktype", accessToken }));
  }, [postBankType]);

  useEffect(() => {
    dispatch(fetGetBankName({ api: "bankName", accessToken }));
  }, [postBankName]);

  const bankTypeArr = bankType?.data.allBankTypes;

  const bankNameArr = bankName?.data.allBankName;

  //need to delete above 4 element

  const list = bankNameArr?.map((d, i) => (
    <tr key={d._id} className={styles.deposite_tr_style}>
      <td>{i + 1}</td>
      <td>{d.bankType.bankTypeName}</td>
      <td>{d.bankName}</td>
      <td>logo</td>
      <td>
        <NormalButton className={styles.deposite_edit_btn}>Edit</NormalButton>
      </td>
    </tr>
  ));

  return (
    <>
      <DepositeAccBox bankNameArr={bankTypeArr} />
      <div className={`page_style ${styles.deposite_page}`}>
        <div className={`box_shadow ${styles.deposite_container}`}>
          <p>Deposite Name </p>
          <NormalButton
            onClick={() => dispatch(setModalAccDepo(true))}
            className={styles.deposite_create_btn}
          >
            Create
          </NormalButton>
        </div>
        <div className={`hide_scroll table_d_container`}>
          <Tables thead={bankNameHead} tbody={list} />
        </div>
      </div>
    </>
  );
}

export default BankName;
