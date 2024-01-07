import React from "react";
import ToWithdrawForm from "../../Component/ToWithdrawForm";
import { selectCollapsed } from "../../Feactures/modalSlice";
import { useSelector } from "react-redux";

function ToWithdraw() {
  const collapsed = useSelector(selectCollapsed);
  return (
    <div
      className={collapsed ? "page_style_coll" : "page_style"}
      style={{ position: "relative" }}
    >
      <ToWithdrawForm />
    </div>
  );
}

export default ToWithdraw;
