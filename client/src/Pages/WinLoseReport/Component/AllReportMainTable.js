import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginate from "../../../Component/Paginate/Paginate";

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
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchSlotAllUser({
        api: `slotegrator/users/reports?page=${page}&perPage=50`,
        accessToken,
      })
    );
  }, [page]);

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
      <Paginate total={userAll?.meta.total} setPage={setPage} limit={50} />
    </div>
  );
}

export default AllReportMainTable;
