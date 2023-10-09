import React from "react";
import AllusersFun from "./AllusersFun";

function MainTable({ data, dataArr }) {
  const admin = data === "admin";
  // const datas = admin ? alladminData : allusersData;

  const tableData = dataArr.map((d, index) => (
    <tr key={d._id} className="table_d_tbody_tr">
      <td>{index + 1}</td>
      <td>{d.name}</td>
      {admin ? null : <td>{d.unit}</td>}
      {<AllusersFun data={data} />}
      <td>{d.status ? "Active" : "InActive"}</td>
      <td className="table_d_lastTime">
        <span>{new Date(d.loginTime).toLocaleDateString()}</span>
        <span>4:15 AM</span>
      </td>
    </tr>
  ));
  return (
    <table className={"table_d"}>
      <thead>
        <tr>
          <th style={{ width: "7rem" }}>ID</th>
          <th style={{ width: "10rem" }}>Name</th>
          {admin ? null : <th style={{ width: "13rem" }}>Balance</th>}
          <th>Function</th>
          <th style={{ width: "9rem" }}>Status</th>
          <th style={{ width: "13rem" }}>Last login Time</th>
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  );
}

export default MainTable;
