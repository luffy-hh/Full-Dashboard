import React from "react";
import styles from "./LuckyNumber.module.css";

function LuckyTable() {
  return (
    <div className="table_d_container hide_scroll">
      <table className="table_d">
        <thead>
          <tr>
            <th style={{ minWidth: "7rem" }}>No</th>
            <th style={{ minWidth: "20rem" }}>2D Number</th>
            <th style={{ minWidth: "30rem" }}>Category</th>
            <th style={{ width: "20rem" }}>Date</th>
            <th style={{ width: "15rem" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.luck_tr_style}>
            <td>1</td>
            <td>24</td>
            <td>Thai 2d morning</td>
            <td>10-10-2023</td>
            <td>Complete</td>
          </tr>
          <tr className={styles.luck_tr_style}>
            <td>1</td>
            <td>24</td>
            <td>Thai 2d morning</td>
            <td>10-10-2023</td>
            <td>Complete</td>
          </tr>
          <tr className={styles.luck_tr_style}>
            <td>1</td>
            <td>24</td>
            <td>Thai 2d morning</td>
            <td>10-10-2023</td>
            <td>Complete</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LuckyTable;
