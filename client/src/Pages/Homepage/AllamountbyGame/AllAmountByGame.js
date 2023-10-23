import React from "react";
import { selectChartGameData } from "../../../Feactures/winOrLoseSlice";
import { useSelector } from "react-redux";
import styles from "../Home.module.css";

function AllAmountByGame() {
  const chartGameData = useSelector(selectChartGameData);

  const list = chartGameData.map((d) => (
    <li key={d.game}>
      <span>{d.game}</span>
      <span>{d.win}</span>
    </li>
  ));
  return <ul className={styles.dash_all_user}>{list}</ul>;
}

export default AllAmountByGame;
