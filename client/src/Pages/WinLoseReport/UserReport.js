import React from "react";
import ReportTable from "./Component/ReportTable";
import { selectUserReport, selectUser } from "../../Feactures/winOrLoseSlice";
import { useSelector } from "react-redux";
import { selectCollapsed } from "../../Feactures/modalSlice";

function UserReport() {
  const userReport = useSelector(selectUserReport);
  const user = useSelector(selectUser);
  const collapsed = useSelector(selectCollapsed);
  return (
    <div
      style={{ overflow: "hidden" }}
      className={collapsed ? "page_style_coll" : "page_style"}
    >
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
