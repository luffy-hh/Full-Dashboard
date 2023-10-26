import React, { useEffect } from "react";
import { setModalDifDepo } from "../../Feactures/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import NormalButton from "../../Component/NormalButton";
import DifferentDepositeBox from "../../Component/CustomBox/DifferentDepositeBox";
import {
  fetGetBankType,
  selectBankType,
  selectPostBankType,
  fetGetBankName,
  selectBankName,
  selectPostBankName,
} from "../../Feactures/bankApiSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import styles from "../DepositeType/DepositeType.module.css";

function DepositeDiff() {
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const postBankType = useSelector(selectPostBankType);
  const bankType = useSelector(selectBankType);
  const bankName = useSelector(selectBankName);
  const postBankName = useSelector(selectPostBankName);

  useEffect(() => {
    dispatch(fetGetBankType({ api: "banktype", accessToken }));
  }, [postBankType]);

  useEffect(() => {
    dispatch(fetGetBankName({ api: "bankName", accessToken }));
  }, [postBankName]);

  const allBanks = bankType?.data.allBankType;
  const bankNameArr = bankName?.data.allBankName;

  const list = bankNameArr?.map((d, i) => (
    <tr key={d._id} className={styles.deposite_tr_style}>
      <td>{i + 1}</td>
      <td>{d.bankTypeId.name}</td>
      <td>{d.name}</td>
      <td>Logo</td>
      <td>
        <NormalButton className={styles.deposite_edit_btn}>Edit</NormalButton>
      </td>
    </tr>
  ));
  return (
    <>
      <DifferentDepositeBox allBankArr={allBanks} />
      <div className="page_style">
        <div className={`box_shadow ${styles.deposite_container}`}>
          <p>ငွေသွင်း/ထုတ်အမျိုးကွဲ</p>
          <NormalButton
            onClick={() => dispatch(setModalDifDepo(true))}
            className={styles.deposite_create_btn}
          >
            Create
          </NormalButton>
        </div>
        <div className="table_d_container">
          <table className="table_d box_shadow">
            <thead>
              <tr>
                <th style={{ width: "8rem" }}>စဥ်</th>
                <th>Bank Type</th>
                <th>Bank Name </th>

                <th style={{ minWidth: "15rem" }}>လိုဂို</th>
                <th>လုပ်ဆောင်ချက်</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DepositeDiff;
