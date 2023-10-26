import React, { useEffect } from "react";
import { setModalAccDepo } from "../../Feactures/modalSlice";
import {
  fetGetBankName,
  selectBankName,
  selectPostBankName,
  fetGetBankAcc,
  selectPostBankAcc,
  selectBankAcc,
} from "../../Feactures/bankApiSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import NormalButton from "../../Component/NormalButton";
import styles from "../DepositeType/DepositeType.module.css";
import DepositeAccBox from "../../Component/CustomBox/DepositeAccBox";

function DepositeAcc() {
  const dispatch = useDispatch();
  const bankName = useSelector(selectBankName);
  const postBankName = useSelector(selectPostBankName);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const postBankAcc = useSelector(selectPostBankAcc);
  const bankAcc = useSelector(selectBankAcc);

  useEffect(() => {
    dispatch(fetGetBankName({ api: "bankName", accessToken }));
  }, [postBankName]);

  useEffect(() => {
    dispatch(fetGetBankAcc({ api: "bankAcc", accessToken }));
  }, [postBankAcc]);

  const bankNameArr = bankName?.data.allBankName;

  const bankAccArr = bankAcc?.data.allBankAcc;

  console.log(bankAccArr && bankAccArr);

  const list = bankAccArr?.map((d, i) => (
    <tr key={d._id} className={styles.deposite_tr_style}>
      <td>{i + 1}</td>
      <td>Online Payment</td>
      <td>{d.bankAcc.account_name}</td>
      <td>Logo</td>
      <td>{d.bankAcc.account}</td>
      <td>{d.bankAcc.name}</td>
      <td>
        <NormalButton className={styles.deposite_edit_btn}>Edit</NormalButton>
      </td>
    </tr>
  ));

  return (
    <>
      <DepositeAccBox bankNameArr={bankNameArr} />
      <div className={`page_style ${styles.deposite_page}`}>
        <div className={`box_shadow ${styles.deposite_container}`}>
          <p>Deposite Account</p>
          <NormalButton
            onClick={() => dispatch(setModalAccDepo(true))}
            className={styles.deposite_create_btn}
          >
            Create
          </NormalButton>
        </div>
        <div className={`hide_scroll ${styles.depositeAcc_table_container}`}>
          <table className={`${styles.table_d_acc} box_shadow`}>
            <thead>
              <tr>
                <th style={{ minWidth: "8rem" }}>စဥ်</th>
                <th style={{ minWidth: "20rem" }}>Bank Type</th>
                <th style={{ minWidth: "20rem" }}>Bank Name</th>

                <th style={{ minWidth: "20rem" }}>လိုဂို</th>
                <th style={{ minWidth: "20rem" }}>Account No</th>
                <th style={{ minWidth: "20rem" }}>Account Name</th>
                <th style={{ minWidth: "25rem" }}>လုပ်ဆောင်ချက်</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DepositeAcc;
