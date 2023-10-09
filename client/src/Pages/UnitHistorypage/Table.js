import React from "react";
import styles from "./UnitHistory.module.css";
const unitData = [
  {
    id: "1",
    unit: "50000",
    userName: "kyaw kyaw",
    role: "Admin",
    date: "9/16/2023 (2:30 PM)",
  },
  {
    id: "2",
    unit: "70000",
    userName: "Maung Maung",
    role: "Admin",
    date: "9/17/2023 (7:00 AM)",
  },
  {
    id: "3",
    unit: "40000",
    userName: "C Ronaldo",
    role: "Admin",
    date: "9/18/2023 (8:15 AM)",
  },
  {
    id: "4",
    unit: "30000",
    userName: "Rashford",
    role: "Admin",
    date: "9/19/2023 (9:30 PM)",
  },
  {
    id: "5",
    unit: "50000",
    userName: "Rooney",
    role: "Admin",
    date: "9/20/2023 (10:56 PM)",
  },
];

function Table({ data }) {
  const unitListData =
    data &&
    data.map((d, i) => (
      <tr key={d._id} className={styles.unit_history_table_style}>
        <td>{i + 1}</td>
        <td>{d.amount}</td>
        <td>{d.userName}</td>
        <td>Admin</td>
        <td className={styles.unit_history_lastTime}>
          <span> {new Date(d.date).toLocaleDateString()}</span>
          <span> {d.time}</span>
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
