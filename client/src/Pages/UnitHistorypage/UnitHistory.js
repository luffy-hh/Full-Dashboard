import React, { useEffect } from "react";
import Table from "./Table";
import Searchbar from "../../Component/Searchbar/Searchbar";
import {
  fetchGetMainUnitHistory,
  selectMainUnitHistory,
  selectMainUnitHistoryStatus,
  selectlogInData,
} from "../../Feactures/apiSlice";

import {
  selectUnitHistoryQuery,
  setUnitHistoryQuery,
} from "../../Feactures/ShowHideSlice";

import { useSelector, useDispatch } from "react-redux";
import styles from "./UnitHistory.module.css";

function UnitHistory() {
  const dispatch = useDispatch();
  const unitHistoryQuery = useSelector(selectUnitHistoryQuery);

  const mainUnitHistory = useSelector(selectMainUnitHistory);
  const mainUnitHistoryStatus = useSelector(selectMainUnitHistoryStatus);
  const logInData = useSelector(selectlogInData);
  const data =
    mainUnitHistoryStatus === "succeeded" &&
    mainUnitHistory.data.mainUnitHistory;

  const accessToken = logInData.token;
  console.log(mainUnitHistoryStatus === "loading");

  useEffect(() => {
    dispatch(fetchGetMainUnitHistory({ api: "mainUnitHistory", accessToken }));
  }, []);
  return (
    <div className={styles.unitHistoryPage}>
      <div className={styles.unitHistory_container}>
        <div className={styles.unit_history_header}>
          <h3>UnitHistory</h3>
          <Searchbar query={unitHistoryQuery} setQuery={setUnitHistoryQuery} />
        </div>

        <div className={`hide_scroll ${styles.table_container_unit}`}>
          <Table data={data} query={unitHistoryQuery} />
        </div>
      </div>
    </div>
  );
}

export default UnitHistory;
