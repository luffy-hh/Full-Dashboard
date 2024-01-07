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
      <ReportTable
        selectReport={report}
        selectUser={user}
        title="Master Win/Lose Report"
        page="master"
      />
    </div>
  );
}

export default MasterReport;
