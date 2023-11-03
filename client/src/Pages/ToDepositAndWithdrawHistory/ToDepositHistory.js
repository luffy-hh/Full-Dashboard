import React, { useEffect } from "react";
import {
  selectToDeposit,
  selectToDepositHead,
} from "../../Feactures/AllUserPageSlice";
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
  const todeposit = useSelector(selectToDeposit);
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
        backgroundColor: d.description === "deposit" ? "#bbf7d0" : "#fecaca",
        borderBottom: "1px solid #a8a29e",
      }}
      className="table_d_tbody_tr"
    >
      <td>{i + 1}</td>
      <td>{d.description}</td>
      <td
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          alignItems: "center",
          fontSize: "1.6rem",
        }}
      >
        <span>{new Date(d.date).toLocaleDateString()}</span>
        <span>{new Date(d.date).toLocaleTimeString()}</span>
      </td>
      <td>{d.amount}</td>
      <td>{d.status}</td>
      <td>No Data</td>
      <td>No Data</td>
    </tr>
  ));
  return (
    <div className="page_style" style={{ overflow: "hidden" }}>
      <div className={`box_shadow ${styles.deposit_title}`}>
        Deposit and Withdraw History
      </div>
      <div className={`hide_scroll ${styles.depo_with_history}`}>
        <Tables thead={todepositeHead} tbody={tbodyList} />
      </div>
    </div>
  );
}

export default ToDepositHistory;
