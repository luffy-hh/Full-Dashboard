import React, { useState } from "react";
import { DatePicker } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import NormalButton from "../../../Component/NormalButton";
import styles from "./ReportTable.module.css";

function ReportDate() {
  const startOnChange = (date) => {
    console.log(date);
  };

  const endOnChange = (date) => {
    console.log(date);
  };

  return (
    <form className={styles.report_date}>
      <div>
        <label>From</label>
        <DatePicker
          onChange={startOnChange}
          placeholder="Start Date"
          style={{ width: "20rem" }}
        />
      </div>
      <div>
        <label>To</label>
        <DatePicker
          onChange={endOnChange}
          placeholder="End Date"
          style={{ width: "20rem" }}
        />
      </div>
      <NormalButton className={`${styles.report_date_save} btn_hover`}>
        Submit
      </NormalButton>
    </form>
  );
}

export default ReportDate;
