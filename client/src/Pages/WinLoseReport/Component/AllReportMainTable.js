import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import styles from "./ReportTable.module.css";
import {
  selectUserAll,
  fetchSlotAllUser,
  selectUserAllStatus,
} from "../../../Feactures/slotSlice";
import Spinner from "../../../Component/Spinner/Spinner";
import { selectlogInData } from "../../../Feactures/apiSlice";

function AllReportMainTable({ selectReport }) {
  const dispatch = useDispatch();
  const userAll = useSelector(selectUserAll);
  const userAllStatus = useSelector(selectUserAllStatus);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  useEffect(() => {
    dispatch(
      fetchSlotAllUser({ api: "slotegrator/users/reports", accessToken })
    );
  }, []);

  const tableHead = selectReport.map((d, i) => (
    <th style={{ minWidth: "20rem" }} key={i}>
      {d}
    </th>
  ));

  const tableData = userAll?.data.map((d, i) => (
    <tr
      key={`slot_user_${i}`}
      className={`table_d_tbody_tr ${styles.win_lose_color}`}
    >
      <td style={{ minWidth: "20rem" }} className={styles.user_report}>
        <Link to={`${d.player_id}`}>
          <span> {d.player_id}</span>
        </Link>
      </td>
      <td>{d.total_bet}</td>
      <td>{d.total_win}</td>
      <td>{d.total_win - d.total_bet}</td>
      <td>{"no data"}</td>
      <td>{"no data"}</td>
      <td>{"no data"}</td>
      <td>{"no data"}</td>
    </tr>
  ));

  return (
    <div className={`${styles.report_main_table_container} hide_scroll`}>
      {userAllStatus === "loading" ? (
        <Spinner />
      ) : (
        <table className={`box_shadow ${styles.report_all_table}`}>
          <thead>
            <tr> {tableHead}</tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      )}
    </div>
  );
}

export default AllReportMainTable;
