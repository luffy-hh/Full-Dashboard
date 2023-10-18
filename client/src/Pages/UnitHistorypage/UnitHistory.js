import React, { useEffect } from "react";
import Table from "./Table";

import {
  fetchGetMainUnitHistory,
  selectMainUnitHistory,
  selectMainUnitHistoryStatus,
  selectlogInData,
  selectpatchMainUnitData
} from "../../Feactures/apiSlice";



import { useSelector, useDispatch } from "react-redux";
import styles from "./UnitHistory.module.css";

function UnitHistory() {
  const dispatch = useDispatch();
 

  const mainUnitHistory = useSelector(selectMainUnitHistory);
  const mainUnitHistoryStatus = useSelector(selectMainUnitHistoryStatus); 

  const patchMainUnitData = useSelector(selectpatchMainUnitData);
  const logInData = useSelector(selectlogInData);
  const data =
    mainUnitHistoryStatus === "succeeded" &&
    mainUnitHistory.data.mainUnitHistories;

  const accessToken = logInData.token;
 

  useEffect(() => {
    dispatch(
      fetchGetMainUnitHistory({ api: "mainunithistories", accessToken })
    );
  }, [patchMainUnitData]);
  return (
    <div className={styles.unitHistoryPage}>
      <div className={styles.unitHistory_container}>
        <div className={styles.unit_history_header}>
          <h3>Create UnitHistory</h3>
         
        </div>

        <div className={`hide_scroll ${styles.table_container_unit}`}>
          <Table data={data}  />
        </div>
      </div>
    </div>
  );
}

export default UnitHistory;
