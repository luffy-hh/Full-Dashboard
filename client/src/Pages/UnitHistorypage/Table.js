import React from "react";
import styles from "./UnitHistory.module.css";

function Table({ data }) {
  const unitListData =
    data &&
    data.map((d, i) => (
        <tr key={d._id} className={styles.unit_history_table_style}>
          <td>{i + 1}</td>
          <td className={`${d.status === "in" ? styles.color_green : styles.color_red}`}>{d.actionAmount}</td>
          <td>{d.userName}</td>
          <td>Admin</td>
          <td className={styles.unit_history_lastTime}>
            <span> {new Date(d.createDate).toLocaleDateString()}</span>
            <span> {new Date(d.createDate).toLocaleTimeString()}</span>
          </td>
        </tr>
      ));

  return (
    <table className={styles.unit_history_table}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Unit Amount</th>
          <th>User Name</th>
          <th>Role</th>
          <th>Last LogIn Time</th>
        </tr>
      </thead>
      <tbody>{unitListData}</tbody>
    </table>
  );
}

export default Table;
