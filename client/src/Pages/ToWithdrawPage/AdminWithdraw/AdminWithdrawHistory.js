import React from "react";
import {
  selectAdminUpandDownHistory,
  fetGetWithdrawUpline,
} from "../../../Feactures/bankApiSlice";
import ToWithdrawHistory from "../../ToDepositAndWithdrawHistory/ToWithdrawHistory";

function AdminWithdrawHistory() {
  return (
    <ToWithdrawHistory
      api={"withdarwUpline"}
      history={selectAdminUpandDownHistory}
      withDrawFun={fetGetWithdrawUpline}
      uplineOrDownLine="UpLine"
    />
  );
}

export default AdminWithdrawHistory;
