import React, { useEffect } from "react";
import { setModalDifDepo } from "../../Feactures/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import NormalButton from "../../Component/NormalButton";
import DifferentDepositeBox from "../../Component/CustomBox/DifferentDepositeBox";
import {
  fetGetBankCat,
  selectBankCat,
  selectPostBankCat,
  fetGetBankType,
  selectBankType,
  selectPostBankType,
} from "../../Feactures/bankApiSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import { selectBankTypeHead } from "../../Feactures/AllUserPageSlice";
import Tables from "../../Component/Tables";
import styles from "../DepositeType/DepositeType.module.css";

function BankType() {
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const postBankCat = useSelector(selectPostBankCat);
  const bankCat = useSelector(selectBankCat);
  const bankType = useSelector(selectBankType);
  const postBankType = useSelector(selectPostBankType);
  const bankTypeHead = useSelector(selectBankTypeHead);

  useEffect(() => {
    dispatch(fetGetBankCat({ api: "bankcat", accessToken }));
  }, [postBankCat]);

  useEffect(() => {
    dispatch(fetGetBankType({ api: "banktype", accessToken }));
  }, [postBankType]);

  const allBankCat = bankCat?.data.allBankCategories;
  const bankTypeArr = bankType?.data.allBankTypes;

  const list = bankTypeArr?.map((d, i) => (
    <tr key={d._id} className={styles.deposite_tr_style}>
      <td>{i + 1}</td>
      <td>{d.bankTypeName}</td>
      <td>
        <NormalButton className={styles.deposite_edit_btn}>Edit</NormalButton>
      </td>
    </tr>
  ));
  return (
    <>
      <DifferentDepositeBox allBankArr={allBankCat} />
      <div className="page_style">
        <div className={`box_shadow ${styles.deposite_container}`}>
          <p>Bank Type</p>
          <NormalButton
            onClick={() => dispatch(setModalDifDepo(true))}
            className={styles.deposite_create_btn}
          >
            Create
          </NormalButton>
        </div>
        <div className="table_d_container hide_scroll box_shadow">
          <Tables thead={bankTypeHead} tbody={list} />
        </div>
      </div>
    </>
  );
}

export default BankType;
