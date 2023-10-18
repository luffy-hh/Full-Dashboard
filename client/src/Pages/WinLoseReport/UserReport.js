import React from "react";
import ReportTable from "./Component/ReportTable";
import { selectUserReport, selectUser } from "../../Feactures/winOrLoseSlice";
import { useSelector } from "react-redux";

function UserReport() {
  const userReport = useSelector(selectUserReport);
  const user = useSelector(selectUser);
  return (
    <div style={{ overflow: "hidden" }} className="page_style">
      <ReportTable
        selectReport={userReport}
        selectUser={user}
        title="User Win/Lose Report"
        page="user"
      />
    </div>
  );
}

export default UserReport;
