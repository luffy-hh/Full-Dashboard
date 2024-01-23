import React, { useEffect, useState } from "react";

import ReportDate from "./ReportDate";
import ReportGameCat from "./ReportGameCat";
import { useParams } from "react-router-dom";
import styles from "./ReportTable.module.css";
import { selectUserDetailHead } from "../../../Feactures/winOrLoseSlice";
import {
  selectGameData,
  selectUserRecordSlot,
  fetchSlotUserRecord,
  selectUserRecordSlotStatus,
} from "../../../Feactures/slotSlice";
import { selectCollapsed } from "../../../Feactures/modalSlice";
import { selectlogInData } from "../../../Feactures/apiSlice";

import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../Component/Spinner/Spinner";
import Paginate from "../../../Component/Paginate/Paginate";

function UserReportTable() {
  const { count } = useParams();
  const gameData = useSelector(selectGameData);
  console.log(gameData);

  const [page, setPage] = useState(1);

  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  const userDetailHead = useSelector(selectUserDetailHead);
  const collapsed = useSelector(selectCollapsed);
  const userRecordSlot = useSelector(selectUserRecordSlot);
  const userRecordSlotStatus = useSelector(selectUserRecordSlotStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("working userreport api", page);
    dispatch(
      fetchSlotUserRecord({
        api: `slotegrator/users/reports/${gameData.player_id}?game_name=${gameData.game_name}&game_type=${gameData.game_type}&provider_name=${gameData.game_provider_name}&page=${page}&perPage=100`,
        accessToken,
      })
    );
  }, [page]);

  const tableHeader = userDetailHead.map((d, i) => (
    <th key={`userHead${i}`} style={{ minWidth: "20rem" }}>
      {d}
    </th>
  ));

  console.log(userRecordSlot && userRecordSlot.data);

  const tableData = userRecordSlot?.data.map((d, i) => (
    <tr className={styles.win_lose_color} key={`user_record_${i}`} style={{ backgroundColor: d.action === 'bet' ? 'gray' : 'defaultColor' }}>
      <td>{d.created_at}</td>
      <td>{d.action}</td>
      <td>{d.player_id}</td>
      <td>{d.game_name}</td>
      <td>{d.game_type}</td>
      <td>{d.game_provider_name}</td>
      <td>{d.before}</td>
      <td>{d.amount}</td>
      <td>{d.after}</td>
      <td>{d.after-d.before}</td>
    </tr>
  ));

  return (
    <div
      className={collapsed ? "page_style_coll" : "page_style"}
      style={{ overflow: "hidden" }}
    >
      <div className={`box_shadow ${styles.user_report_table_detail}`}>
        <h3> Win/Lose Detail Report</h3>
        <ReportDate
          condition={"user_record"}
          gameapi={`slotegrator/users/reports/${gameData.player_id}?game_name=${gameData.game_name}&game_type=${gameData.game_type}&provider_name=${gameData.game_provider_name}`}
        />
        <ReportGameCat
          condition={"user_record"}
          gameapi={`slotegrator/users/reports/${gameData.player_id}?game_name=${gameData.game_name}&game_type=${gameData.game_type}&provider_name=${gameData.game_provider_name}`}
        />
      </div>
      <section
        style={{ marginTop: "2.4rem" }}
        className={`${styles.report_main_table_container} hide_scroll`}
      >
        {userRecordSlotStatus === "loading" ? (
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
      <Paginate
        total={userRecordSlot?.meta.total}
        setPage={setPage}
        limit={100}
      />
    </div>
  );
}

export default UserReportTable;
