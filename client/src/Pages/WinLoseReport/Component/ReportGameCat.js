import React from "react";
import NormalButton from "../../../Component/NormalButton";
import { selectDays } from "../../../Feactures/winOrLoseSlice";
import { useSelector } from "react-redux";
import styles from "./ReportTable.module.css";

function ReportGameCat() {
  const days = useSelector(selectDays);
  const list = days.map((d, i) => (
    <li key={i}>
      <NormalButton
        className={`btn_hover ${styles.report_date_save} ${styles.days_btn}`}
      >
        {d}
      </NormalButton>
    </li>
  ));
  return (
    <div className={styles.report_game_cat}>
      <p>Quick Select</p>
      <ul className={styles.days_list}>{list}</ul>
    </div>
  );
}

export default ReportGameCat;
