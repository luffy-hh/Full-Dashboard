import React from "react";
import styles from "./AllusersTable.module.css";
import MainTable from "./MainTable";

function AllusersTable({ data, dataArr, query, downLine }) {
  return (
    <div className={`${styles.allusers_table_container} hide_scroll`}>
      <MainTable
        data={data}
        dataArr={dataArr}
        query={query}
        downLine={downLine}
      />
    </div>
  );
}

export default AllusersTable;
