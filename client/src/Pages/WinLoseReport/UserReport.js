import React, { useEffect } from "react";
import ReportTable from "./Component/ReportTable";
import { selectUserReport } from "../../Feactures/winOrLoseSlice";

import { selectCollapsed } from "../../Feactures/modalSlice";

import { useSelector, useDispatch } from "react-redux";

function UserReport() {
  const userReport = useSelector(selectUserReport);

  const collapsed = useSelector(selectCollapsed);

  return (
    <div
      style={{ overflow: "hidden" }}
      className={collapsed ? "page_style_coll" : "page_style"}
    >
      <ReportTable selectReport={userReport} title="User Win/Lose Report" />
    </div>
  );
}

export default UserReport;
