import React from "react";
import styles from "./AllusersTable.module.css";
import MainTable from "./MainTable";

function AllusersTable({ data, dataArr }) {
  return (
    <div className={`${styles.allusers_table_container} hide_scroll`}>
      <MainTable data={data} dataArr={dataArr} />
    </div>
  );
}

export default AllusersTable;
