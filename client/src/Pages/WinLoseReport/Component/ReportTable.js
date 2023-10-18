import React from "react";
import styles from "./ReportTable.module.css";
import ReportDate from "./ReportDate";
import ReportGameCat from "./ReportGameCat";
import AllReportMainTable from "./AllReportMainTable";
import Searchbar from "../../../Component/Searchbar/Searchbar";

function ReportTable({ selectReport, selectUser, title, page }) {
  return (
    <>
      <div className={`box_shadow  ${styles.report_container}`}>
        <h3>{title}</h3>
        <ReportDate />
        <ReportGameCat />
      </div>
      <section style={{ marginTop: "3.2rem" }}>
        <Searchbar />
      </section>
      <AllReportMainTable
        selectReport={selectReport}
        selectUser={selectUser}
        page={page}
      />
    </>
  );
}

export default ReportTable;
