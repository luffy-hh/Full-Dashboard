import React from "react";
import {
  selectAgentReport,
  selectAgentUser,
} from "../../Feactures/winOrLoseSlice";
import styles from "./Component/ReportTable.module.css";
import { BiSolidCaretDownCircle } from "react-icons/bi";
import { BiSolidCaretUpCircle } from "react-icons/bi";
import { showAgentGame } from "../../Feactures/winOrLoseSlice";

import { useSelector, useDispatch } from "react-redux";
import { selectCollapsed } from "../../Feactures/modalSlice";
import ReportDate from "./Component/ReportDate";
import ReportGameCat from "./Component/ReportGameCat";
function MasterReport() {
  const collapsed = useSelector(selectCollapsed);
  const agentReport = useSelector(selectAgentReport);
  const agentUser = useSelector(selectAgentUser);
  const dispatch = useDispatch();

  const tableHead = agentReport.map((d, i) => (
    <th style={{ minWidth: "20rem" }} key={i}>
      {d}
    </th>
  ));

  const tableBody = agentUser.map((d) => (
    <>
      <tr className={`${styles.win_lose_color} table_d_tbody_tr`} key={d.id}>
        <td
          className={styles.agent_name_dorpdown}
          style={{ minWidth: "20rem" }}
        >
          <span>{d.name}</span>
          {d.action ? (
            <span
              className={styles.drop_icon_red}
              onClick={() => dispatch(showAgentGame(d.id))}
            >
              <BiSolidCaretUpCircle />
            </span>
          ) : (
            <span
              className={styles.drop_icon}
              onClick={() => dispatch(showAgentGame(d.id))}
            >
              <BiSolidCaretDownCircle />
            </span>
          )}
        </td>
        <td>{d.bet}</td>
        <td>{d.totalWin}</td>
        <td>{d.pWinLose}</td>
        <td>{d.agentWinLose}</td>
        <td>{d.agent}</td>
        <td>{d.com}</td>
        <td>{d.rtp}</td>
      </tr>
      {d?.action &&
        d.gameCat.map((d, i) => (
          <tr key={`master_report_${i}`} className={styles.win_lose_color}>
            <td>{d.name}</td>
            <td>{d.bet}</td>
            <td>{d.totalWin}</td>
            <td>{d.pWinLose}</td>
            <td>{d.agentWinLose}</td>
            <td>{d.agent}</td>
            <td>{d.com}</td>
            <td>{d.rtp}</td>
          </tr>
        ))}
    </>
  ));

  return (
    <div
      style={{ overflow: "hidden" }}
      className={collapsed ? "page_style_coll" : "page_style"}
    >
      <div className={`box_shadow  ${styles.report_container}`}>
        <h3>Agent Win/Lose Report</h3>
        <ReportDate condition="alluser" />
        <ReportGameCat />
      </div>
      <section
        style={{ marginTop: "2.4rem" }}
        className={`${styles.report_main_table_container} hide_scroll`}
      >
        <table className={`box_shadow ${styles.report_all_table}`}>
          <thead>
            <tr>{tableHead}</tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
      </section>
    </div>
  );
}

export default MasterReport;
