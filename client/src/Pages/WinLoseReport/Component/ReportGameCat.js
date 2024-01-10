import React, { useState } from "react";
import NormalButton from "../../../Component/NormalButton";
import { selectDays } from "../../../Feactures/winOrLoseSlice";
import { useSelector } from "react-redux";
import styles from "./ReportTable.module.css";

function ReportGameCat() {
  const days = useSelector(selectDays);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getFormattedDate = (date, endDate) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    //call api with if condition
    return `${year}-${month}-${day}`;
  };

  console.log(startDate, endDate);

  const btnCondition = (interval) => {
    const currentDate = new Date();
    switch (interval) {
      case "Today":
        const todayStartDate = getFormattedDate(currentDate);
        setStartDate(todayStartDate);
        setEndDate(todayStartDate);
        break;
      case "Yesterday":
        const yesterday = new Date(currentDate);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStartDate = getFormattedDate(yesterday);
        const yesterdayEndDate = getFormattedDate(currentDate);
        setStartDate(yesterdayStartDate);
        setEndDate(yesterdayEndDate);

        break;
      case "This week":
        const thisWeekStartDate = new Date(currentDate);
        thisWeekStartDate.setDate(
          thisWeekStartDate.getDate() - thisWeekStartDate.getDay()
        );
        const thisWeekEndDate = getFormattedDate(currentDate);
        setStartDate(getFormattedDate(thisWeekStartDate));
        setEndDate(thisWeekEndDate);
        break;
      case "Last week":
        const lastWeekStartDate = new Date(currentDate);
        lastWeekStartDate.setDate(
          lastWeekStartDate.getDate() - lastWeekStartDate.getDay() - 7
        );
        const lastWeekEndDate = getFormattedDate(currentDate);
        setStartDate(getFormattedDate(lastWeekStartDate));

        setEndDate(lastWeekEndDate);
        break;
      case "This month":
        const thisMonthStartDate = new Date(currentDate);
        thisMonthStartDate.setDate(1);
        setStartDate(getFormattedDate(thisMonthStartDate));
        setEndDate(getFormattedDate(currentDate));
        break;
      case "Last month":
        const lastMonthStartDate = new Date(currentDate);
        const lastMonthEndDate = getFormattedDate(new Date(lastMonthStartDate));
        lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1);
        lastMonthStartDate.setDate(1);

        setStartDate(getFormattedDate(lastMonthStartDate));
        setEndDate(lastMonthEndDate);
        break;
      default:
        break;
    }
  };

  const handleButtonClick = (interval) => {
    btnCondition(interval);
  };

  const list = days.map((d, i) => (
    <li key={i}>
      <NormalButton
        className={`btn_hover ${styles.report_date_save} ${styles.days_btn}`}
        onClick={() => handleButtonClick(d)}
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
