import React, { useEffect } from "react";
import NormalButton from "../../Component/NormalButton";
import { setModalDeposite } from "../../Feactures/modalSlice";
import {
  selectBankCat,
  fetGetBankCat,
  selectPostBankCat,
} from "../../Feactures/bankApiSlice";
import { selectBankCatHead } from "../../Feactures/AllUserPageSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectlogInData } from "../../Feactures/apiSlice";
import styles from "./DepositeType.module.css";
import CreateDepositeBox from "../../Component/CustomBox/CreateDepositeBox";
import Tables from "../../Component/Tables";
import { selectCollapsed } from "../../Feactures/modalSlice";

function BankCategory() {
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const bankCat = useSelector(selectBankCat);
  const postBankCat = useSelector(selectPostBankCat);
  const bankCatHead = useSelector(selectBankCatHead);
  const collapse = useSelector(selectCollapsed);

  useEffect(() => {
    dispatch(fetGetBankCat({ api: "bankcat", accessToken }));
  }, [postBankCat]);

  const bankCatArr = bankCat?.data.allBankCategories;

  const list = bankCatArr?.map((d, i) => (
    <tr key={d._id} className={styles.deposite_tr_style}>
      <td key={d._id}>{i + 1}</td>
      <td>{d.bankCatName}</td>
      <td>
        <NormalButton className={styles.deposite_edit_btn}>Edit</NormalButton>
      </td>
    </tr>
  ));
  return (
    <>
      <CreateDepositeBox />
      <div className={collapse ? "page_style_coll" : "page_style"}>
        <div className={`box_shadow ${styles.deposite_container}`}>
          <p>Bank Category</p>
          <NormalButton
            onClick={() => dispatch(setModalDeposite(true))}
            className={styles.deposite_create_btn}
          >
            Create
          </NormalButton>
        </div>

        <div className="table_d_container">
          <Tables thead={bankCatHead} tbody={list} />
        </div>
      </div>
    </>
  );
}

export default BankCategory;
