import React from "react";
import AllusersFun from "./AllusersFun";

function MainTable({ data, dataArr, query }) {
  const admin = data === "admin";
  // const datas = admin ? alladminData : allusersData;

  const tableData = dataArr
    .filter((val) => {
      if (query === "") {
        return val;
      } else if (val.name.toLowerCase().includes(query.toLowerCase())) {
        return val;
      }
    })
    .map((d, index) => (
      <tr key={d._id} className="table_d_tbody_tr">
        <td>{index + 1}</td>
        <td>{d.name}</td>
        {admin ? null : <td>{d.unit}</td>}
        {<AllusersFun data={data} />}
        <td>{d.status ? "Active" : "InActive"}</td>
        <td className="table_d_lastTime">
          <span>{new Date(d.loginTime).toLocaleDateString()}</span>
          <span>{new Date(d.loginTime).toLocaleTimeString()}</span>
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
