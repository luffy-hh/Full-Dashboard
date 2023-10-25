import React from "react";

function ThaiTwoDTable({ tableData, tableExpData }) {
  const tableHeadList = tableData.map((d, i) => (
    <tr key={i}>
      <th>{d.no}</th>
      <th style={{ minWidth: "10rem" }}>{d.twoD}</th>
      <th>{d.bet}</th>
      <th>{d.total}</th>
      <th>{d.success}</th>
      <th>{d.profit}</th>
    </tr>
  ));

  const tablelist = tableExpData.map((d, i) => (
    <tr className="table_d_tbody_tr" key={i}>
      <td>{d.no}</td>
      <td>{d.twoD}</td>
      <td>{d.bet}</td>
      <td>{d.total}</td>
      <td>{d.success}</td>
      <td>{d.profit}</td>
    </tr>
  ));

  return (
    <div className="table_d_container hide_scroll">
      <table className="table_d">
        <thead>{tableHeadList}</thead>
        <tbody>{tablelist}</tbody>
      </table>
    </div>
  );
}

export default ThaiTwoDTable;
