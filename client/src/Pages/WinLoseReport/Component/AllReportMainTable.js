import React from "react";
import { Link } from "react-router-dom";
import { BiSolidCaretDownCircle } from "react-icons/bi";
import { BiSolidCaretUpCircle } from "react-icons/bi";
import { showAgentGame } from "../../../Feactures/winOrLoseSlice";
import { useDispatch } from "react-redux";
import styles from "./ReportTable.module.css";

//{name : 'agent-1',bet : 10000, totalWin : 100000,pWinLose : 100000,agentWinLose:10000,agent:100000,rtp:100000, action : false, gameCat
function AllReportMainTable({ selectReport, selectUser, page }) {
  const dispatch = useDispatch();

  const tableHead = selectReport.map((d, i) => (
    <th style={{ minWidth: "20rem" }} key={i}>
      {d}
    </th>
  ));

  const tableData = selectUser.map((d, i) => (
    <>
      <tr className={styles.win_lose_color} key={i}>
        {page === "master" ? (
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
        ) : (
          <td style={{ minWidth: "20rem" }} className={styles.user_report}>
            <Link to={`${d.name}`}>
              <span> {d.name}</span>
            </Link>
          </td>
        )}
        <td>{d.bet}</td>
        <td>{d.totalWin}</td>
        <td>{d.pWinLose}</td>
        <td>{d.agent}</td>
        <td>{d.agentWinLose}</td>
        <td>{d.com}</td>
        <td>{d.rtp}</td>
      </tr>
      {d?.action &&
        d.gameCat.map((d, i) => (
          <tr key={`nesttr_${i}`} className={styles.win_lose_color}>
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
    <div className={`${styles.report_main_table_container} hide_scroll`}>
      <table className={`box_shadow ${styles.report_all_table}`}>
        <thead>
          <tr> {tableHead}</tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
}

export default AllReportMainTable;
