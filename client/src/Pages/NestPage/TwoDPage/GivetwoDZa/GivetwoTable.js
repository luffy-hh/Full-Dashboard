import React from "react";
import styles from "./GivetwoDZa.module.css";

function GivetwoTable() {
  return (
    <table className={styles.giveTwo_table}>
      <thead>
        <tr>
          <th>စဥ်</th>
          <th>အမျိုးအစား</th>
          <th>အချိန်</th>
          <th>အလျော်(ဇ)</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.give_table_style}>
          <td>1</td>
          <td>2D</td>
          <td>AM</td>
          <td>90</td>
        </tr>
        <tr className={styles.give_table_style}>
          <td>2</td>
          <td>2D</td>
          <td>PM</td>
          <td>90</td>
        </tr>
      </tbody>
    </table>
  );
}

export default GivetwoTable;
