import React, { useEffect } from "react";

import ReportDate from "./ReportDate";
import ReportGameCat from "./ReportGameCat";
import { useParams } from "react-router-dom";
import styles from "./ReportTable.module.css";
import { selectUserMiddleHead } from "../../../Feactures/winOrLoseSlice";
import { Link } from "react-router-dom";
import { selectlogInData } from "../../../Feactures/apiSlice";

import { selectCollapsed } from "../../../Feactures/modalSlice";
import {
  fetchSlotUserDetail,
  selectUserDetailSlot,
  selectUserDetailSlotStatus,
  setGameData,
} from "../../../Feactures/slotSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../Component/Spinner/Spinner";

function MiddleReportTable() {
  const { userId } = useParams();

  const userDetailHead = useSelector(selectUserMiddleHead);
  const collapsed = useSelector(selectCollapsed);
  const dispatch = useDispatch();
  const userDetail = useSelector(selectUserDetailSlot);
  const userDetailStatus = useSelector(selectUserDetailSlotStatus);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  useEffect(() => {
    dispatch(
      fetchSlotUserDetail({
        api: `slotegrator/users/reports-detail?userId=${userId}`,
        accessToken,
      })
    );
  }, []);

  const tableHeader = userDetailHead.map((d, i) => (
    <th key={`userHead${i}`} style={{ minWidth: "20rem" }}>
      {d}
    </th>
  ));

  const tableData = userDetail?.data.map((d, i) => (
    <tr
      className={`table_d_tbody_tr ${styles.win_lose_color}`}
      key={`userDeatil_${i}`}
    >
      <td>{d.player_id}</td>
      <td className={styles.game_size}>{d.game_name}</td>
      <td>{d.game_type}</td>
      <td className={styles.game_size}>{d.game_provider_name}</td>
      <td className={styles.user_report}>
        <Link to={`${d.total_bet_count}`}>
          <span onClick={() => dispatch(setGameData(d))}>
            {d.total_bet_count}
          </span>
        </Link>
      </td>
      <td>{d.total_bet}</td>
      <td>{d.total_win}</td>
      <td>{d.total_win - d.total_bet}</td>
    </tr>
  ));

  return (
    <div
      className={collapsed ? "page_style_coll" : "page_style"}
      style={{ overflow: "hidden" }}
    >
      <div className={`box_shadow ${styles.user_report_table_detail}`}>
        <h3>{userId} Win/Lose Detail Report</h3>
        <ReportDate condition={"oneuser"} id={userId} />
        <ReportGameCat condition={"oneuser"} id={userId} />
      </div>
      <section
        style={{ marginTop: "2.4rem" }}
        className={`${styles.report_main_table_container} hide_scroll`}
      >
        {userDetailStatus === "loading" ? (
          <Spinner />
        ) : (
          <table className={`box_shadow ${styles.report_all_table}`}>
            <thead>
              <tr>{tableHeader}</tr>
            </thead>
            <tbody>{tableData}</tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default MiddleReportTable;
