import React, { useEffect } from "react";
import NormalButton from "../../Component/NormalButton";
import { setModalDeposite } from "../../Feactures/modalSlice";
import {
  fetGetBankType,
  selectBankType,
  selectPostBankType,
} from "../../Feactures/bankApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectlogInData } from "../../Feactures/apiSlice";
import styles from "./DepositeType.module.css";
import CreateDepositeBox from "../../Component/CustomBox/CreateDepositeBox";

function DepositeType() {
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const bankType = useSelector(selectBankType);
  const postBankType = useSelector(selectPostBankType);

  useEffect(() => {
    dispatch(fetGetBankType({ api: "banktype", accessToken }));
  }, [postBankType]);

  const bankTypeArr = bankType?.data.allBankType;

  const list = bankTypeArr?.map((d, i) => (
    <tr key={d._id} className={styles.deposite_tr_style}>
      <td key={d._id}>{i + 1}</td>
      <td>{d.name}</td>
      <td>
        <NormalButton className={styles.deposite_edit_btn}>Edit</NormalButton>
      </td>
    </tr>
  ));
  return (
    <>
      <CreateDepositeBox />
      <div className="page_style">
        <div className={`box_shadow ${styles.deposite_container}`}>
          <p>Deposite Type</p>
          <NormalButton
            onClick={() => dispatch(setModalDeposite(true))}
            className={styles.deposite_create_btn}
          >
            Create
          </NormalButton>
        </div>

        <div className="table_d_container">
          <table className="table_d box_shadow">
            <thead>
              <tr>
                <th>စဥ်</th>
                <th>Bank Type</th>
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

export default DepositeType;
