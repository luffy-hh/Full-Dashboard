import React from "react";
import { selectCollapsed } from "../../Feactures/modalSlice";
import { useSelector } from "react-redux";

import styles from "./UnitHistoryTransfer.module.css";

function UnitHistoryTransferCom({ list }) {
  // const sortList = unitTransferArr?.sort(
  //   (a, b) => new Date(a.transferDat).getMilliseconds - new Date(b.transferDate)
  // ).getMilliseconds;
  // console.log(sortList);

  const collapsed = useSelector(selectCollapsed);

  return (
    <div
      className={`${collapsed ? "page_style_coll" : "page_style"} ${
        styles.unit_transfer_page
      }`}
    >
      <p className={`${styles.transfer_title} box_shadow`}>
        Unit Transfer History
      </p>
      <div className={` hide_scroll ${styles.transfer_container} `}>
        <table className={`box_shadow ${styles.table_transfer}`}>
          <thead>
            <tr>
              <th style={{ minWidth: "10rem" }}>No</th>
              <th style={{ minWidth: "25rem" }}>Date/Time</th>

              <th style={{ minWidth: "20rem" }}>Before Amount</th>
              <th style={{ minWidth: "20rem" }}>Amount</th>
              <th style={{ minWidth: "20rem" }}>After Amount</th>
              <th style={{ minWidth: "20rem" }}>From</th>
              <th style={{ minWidth: "20rem" }}>To</th>
              <th style={{ minWidth: "20rem" }}>Description</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    </div>
  );
}

export default UnitHistoryTransferCom;
