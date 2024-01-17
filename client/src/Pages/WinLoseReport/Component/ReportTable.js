import React from "react";
import styles from "./ReportTable.module.css";
import ReportDate from "./ReportDate";
import ReportGameCat from "./ReportGameCat";
import AllReportMainTable from "./AllReportMainTable";

function ReportTable({ selectReport, title }) {
  return (
    <>
      <div className={`box_shadow  ${styles.report_container}`}>
        <h3>{title}</h3>
        <ReportDate condition="alluser" />
        <ReportGameCat condition="alluser" />
      </div>

      <AllReportMainTable selectReport={selectReport} />
    </>
  );
}

export default ReportTable;
