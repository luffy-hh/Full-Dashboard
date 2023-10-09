import React from "react";

import { useSelector } from "react-redux";

import styles from "./HotNumber.module.css";
import CancelHot from "./CancelHot";

function List({ list, listHistory, clickListHistory }) {
  const listHistoryS = useSelector(listHistory);
  const lists = useSelector(list);

  // console.log(list);

  const allLists = lists.map((c) => (
    <tr className={styles.tdatas}>
      <td>{c.id}</td>
      <td>{c.no}</td>
      <td>{c.amount} kyats</td>
      <td>{c.date}</td>
    </tr>
  ));

  return (
    <div
      className={`${styles.list_section} ${
        listHistoryS ? styles.list_open : ""
      }`}
      style={{ backgroundImage: "url(/img/TwoThree/VoucherBox.png)" }}
    >
      <table className={styles.tables}>
        <thead>
          <tr className={styles.theads}>
            <th>ID</th>
            <th>Number</th>
            <th>Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{allLists}</tbody>
      </table>
      <CancelHot hideFun={clickListHistory} top="2" right="2" />
    </div>
  );
}

export default List;
