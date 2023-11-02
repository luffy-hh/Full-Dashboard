import React from "react";

function Tables({ thead, tbody }) {
  const theadList = thead.map((d) => <th key={d}>{d}</th>);

  return (
    <table className="table_d">
      <thead>
        <tr>{theadList}</tr>
      </thead>
      <tbody>{tbody && tbody}</tbody>
    </table>
  );
}

export default Tables;
