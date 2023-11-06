import React, { useEffect } from "react";
import { selectToDepositHead } from "../../Feactures/AllUserPageSlice";
import NormalButton from "../../Component/NormalButton";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPostDeposit,
  selectDeposit,
  selectDepositStatus,
  fetGetDeposit,
} from "../../Feactures/bankApiSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import Tables from "../../Component/Tables";
import styles from "./ToDepositHistory.module.css";
function ToDepositHistory() {
  const todepositeHead = useSelector(selectToDepositHead);

  const deposit = useSelector(selectDeposit);
  const postDeposit = useSelector(selectPostDeposit);
  const depositStatus = useSelector(selectDepositStatus);
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  useEffect(() => {
    dispatch(fetGetDeposit({ api: "deposit", accessToken }));
  }, [postDeposit]);

  const allDeposit = deposit?.data.allDeposit;
  console.log(allDeposit);

  const tbodyList = allDeposit?.map((d, i) => (
    <tr
      key={i}
      style={{
        borderBottom: "1px solid #a8a29e",
      }}
      className="table_d_tbody_tr"
    >
      <td>{i + 1}</td>
      <td>{d.amount}</td>

      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{d.status}</td>
      <td>No Data</td>
      <td className={styles.action}>
        <NormalButton className={`${styles.acc_btn} `}>Accept</NormalButton>
        <NormalButton className={`${styles.rej_btn} `}>Rejected</NormalButton>
      </td>
      <td className={styles.date_style}>
        <span style={{ marginRight: "1.2rem" }}>
          {new Date(d.date).toLocaleDateString()}
        </span>
        <span>{new Date(d.date).toLocaleTimeString()}</span>
      </td>
    </tr>
  ));
  return (
    <div className="page_style" style={{ overflow: "hidden" }}>
      <div className={`box_shadow ${styles.deposit_title}`}>
        To Deposit Request
      </div>
      <div className={`hide_scroll ${styles.depo_with_history}`}>
        <Tables thead={todepositeHead} tbody={tbodyList} />
      </div>
    </div>
  );
}

export default ToDepositHistory;
