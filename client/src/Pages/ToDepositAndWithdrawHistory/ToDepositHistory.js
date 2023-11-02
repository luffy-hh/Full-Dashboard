import React from "react";
import {
  selectToDeposit,
  selectToDepositHead,
} from "../../Feactures/AllUserPageSlice";
import { useSelector } from "react-redux";

import Tables from "../../Component/Tables";
import styles from "./ToDepositHistory.module.css";
function ToDepositHistory() {
  const todepositeHead = useSelector(selectToDepositHead);
  const todeposit = useSelector(selectToDeposit);

  const tbodyList = todeposit.map((d, i) => (
    <tr key={i} className="table_d_tbody_tr">
      {" "}
      <td>{i + 1}</td>
      <td>{d.type}</td>
      <td>{d.sumitTime}</td>
      <td>{d.amount}</td>
      <td>{d.status}</td>
      <td>{d.statusTime}</td>
      <td>{d.description}</td>
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
