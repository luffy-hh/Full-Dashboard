import React from "react";
import {
  selectAgentUser,
  selectAgentReport,
} from "../../Feactures/winOrLoseSlice";
import ReportTable from "./Component/ReportTable";
import { useSelector } from "react-redux";

function MasterReport() {
  const report = useSelector(selectAgentReport);
  const user = useSelector(selectAgentUser);
  return (
    <div style={{ overflow: "hidden" }} className="page_style">
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
