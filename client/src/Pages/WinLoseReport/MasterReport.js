import React from "react";
import {
  selectAgentUser,
  selectAgentReport,
} from "../../Feactures/winOrLoseSlice";
import ReportTable from "./Component/ReportTable";
import { useSelector } from "react-redux";
import { selectCollapsed } from "../../Feactures/modalSlice";
function MasterReport() {
  const report = useSelector(selectAgentReport);
  const user = useSelector(selectAgentUser);
  const collapsed = useSelector(selectCollapsed);
  return (
    <div
      style={{ overflow: "hidden" }}
      className={collapsed ? "page_style_coll" : "page_style"}
    >
      {/* <ReportTable
        selectReport={report}
        selectUser={user}
        title="Master Win/Lose Report"
        page="master"
      /> */}

      {/* <tr className={styles.win_lose_color} key={d.id}>
        
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
</tr>
{d?.action &&
 d.gameCat.map((d, i) => (
   <tr key={i} className={styles.win_lose_color}>
     <td>{d.name}</td>
     <td>{d.bet}</td>
     <td>{d.totalWin}</td>
     <td>{d.pWinLose}</td>
     <td>{d.agentWinLose}</td>
     <td>{d.agent}</td>
     <td>{d.com}</td>
     <td>{d.rtp}</td>
   </tr>
 ))}} */}
    </div>
  );
}

export default MasterReport;
