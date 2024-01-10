import React, { useEffect } from "react";

import ReportDate from "./ReportDate";
import ReportGameCat from "./ReportGameCat";
import { useParams } from "react-router-dom";
import styles from "./ReportTable.module.css";
import { selectUserDetailHead } from "../../../Feactures/winOrLoseSlice";

import { selectCollapsed } from "../../../Feactures/modalSlice";

import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../Component/Spinner/Spinner";

function UserReportTable() {
  const { count } = useParams();

  const userDetailHead = useSelector(selectUserDetailHead);
  const collapsed = useSelector(selectCollapsed);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch();
  // }, []);

  const tableHeader = userDetailHead.map((d, i) => (
    <th key={`userHead${i}`} style={{ minWidth: "20rem" }}>
      {d}
    </th>
  ));

  // const tableData = userDetail?.data.map((d, i) => (
  //   <tr className={styles.win_lose_color} key={`userDeatil_${i}`}>
  //     <td>{"no data"}</td>
  //     <td>{"no data"}</td>
  //     <td>{d.player_id}</td>
  //     <td>{"no date"}</td>
  //     <td>{d.game_name}</td>
  //     <td>{d.game_type}</td>
  //     <td>{d.game_provider_name}</td>
  //     <td>{"no data"}</td>
  //     <td>{d.total_bet}</td>
  //     <td>{d.total_win}</td>
  //     <td>{d.total_win - d.total_bet}</td>
  //     <td>{"no data"}</td>
  //     <td>{"no data"}</td>
  //     <td>{"no data"}</td>
  //     <td>{d.total_bet_count}</td>
  //     <td>{d.game_name}</td>
  //   </tr>
  // ));

  return (
    <div
      className={collapsed ? "page_style_coll" : "page_style"}
      style={{ overflow: "hidden" }}
    >
      <div className={`box_shadow ${styles.user_report_table_detail}`}>
        <h3>{count} Win/Lose Detail Report</h3>
        <ReportDate />
        <ReportGameCat />
      </div>
      <section
        style={{ marginTop: "2.4rem" }}
        className={`${styles.report_main_table_container} hide_scroll`}
      >
        <table className={`box_shadow ${styles.report_all_table}`}>
          <thead>
            <tr>{tableHeader}</tr>
          </thead>
          {/* <tbody>{tableData}</tbody> */}
        </table>
      </section>
    </div>
  );
}

export default UserReportTable;
