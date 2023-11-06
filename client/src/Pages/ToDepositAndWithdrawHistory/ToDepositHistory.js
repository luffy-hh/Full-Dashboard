import React from "react";
import { selectTodepositHistoryHead } from "../../Feactures/AllUserPageSlice";
import { useSelector, useDispatch } from "react-redux";
import Tables from "../../Component/Tables";
import styles from "./ToDepositHistory.module.css";

function ToDepositHistory() {
  const todepositeHead = useSelector(selectTodepositHistoryHead);
  return (
    <div className="page_style" style={{ overflow: "hidden" }}>
      <div className={`box_shadow ${styles.deposit_title}`}>
        To Deposit Request
      </div>
      <div className={`hide_scroll ${styles.depo_with_history}`}>
        <Tables thead={todepositeHead} tbody={""} />
      </div>
    </div>
  );
}

export default ToDepositHistory;
