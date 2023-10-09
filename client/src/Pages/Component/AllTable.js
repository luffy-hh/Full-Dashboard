import React from "react";
import styles from "./AllTable.module.css";

function AllTable({ dataArr }) {
  const dataList = dataArr.map((c) => (
    <tr className={styles.tdata}>
      <td>{c.no}</td>
      <td>{c.name}</td>
      <td>{c.percent} %</td>
    </tr>
  ));

  return (
    <>
      {dataArr.length === 0 ? null : (
        <table className={styles.table}>
          <thead>
            <tr className={styles.thead}>
              <th>No</th>
              <th style={{ width: "25rem" }}>Commision Name</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>{dataList}</tbody>
        </table>
      )}
    </>
  );
}

export default AllTable;
