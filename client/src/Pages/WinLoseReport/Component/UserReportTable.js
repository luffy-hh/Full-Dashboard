import React from "react";

import ReportDate from "./ReportDate";
import ReportGameCat from "./ReportGameCat";
import { useParams } from "react-router-dom";
import styles from "./ReportTable.module.css";
import {
  selectUserDetail,
  selectUserDetailHead,
} from "../../../Feactures/winOrLoseSlice";
import { useSelector } from "react-redux";
//{betTime: "2023/10/14 18:18:37",resultTime : "2023/10/14 18:30:37", userID : 'Ar1111',GameCode : "sport11",GameName:"sport11",Category :"slot",subCategory:"Pragmatic",bBalance:5000,bet:100,win:1100,winLose:1000,aBalance:3000,status:Bet,detail:"pragmatic.com",description : "slot"}
function UserReportTable() {
  const { userId } = useParams();
  const userDetail = useSelector(selectUserDetail);
  const userDetailHead = useSelector(selectUserDetailHead);

  const filterUserDetail = userDetail.filter((d) => d.userID === userId);

  const tableHeader = userDetailHead.map((d, i) => (
    <th key={`userHead${i}`} style={{ minWidth: "20rem" }}>
      {d}
    </th>
  ));

  const tableData = filterUserDetail.map((d, i) => (
    <tr className={styles.win_lose_color} key={`userDeatil_${i}`}>
      <td>{d.betTime}</td>
      <td>{d.resultTime}</td>
      <td>{d.userID}</td>
      <td>{d.GameCode}</td>
      <td>{d.GameName}</td>
      <td>{d.Category}</td>
      <td>{d.subCategory}</td>
      <td>{d.bBalance}</td>
      <td>{d.bet}</td>
      <td>{d.win}</td>
      <td>{d.winLose}</td>
      <td>{d.aBalance}</td>
      <td>{d.status}</td>
      <td>{d.detail}</td>
      <td>{d.description}</td>
    </tr>
  ));

  return (
    <div className="page_style" style={{ overflow: "hidden" }}>
      <div className={`box_shadow ${styles.user_report_table_detail}`}>
        <h3>{userId} Win/Lose Detail Report</h3>
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
          <tbody>{tableData}</tbody>
        </table>
      </section>
    </div>
  );
}

export default UserReportTable;
