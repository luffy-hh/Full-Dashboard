import React from "react";
import {
  fetGetDepositUpline,
  selectDepositAdminHistory,
} from "../../../Feactures/bankApiSlice";
import ToDepositHistory from "../../ToDepositAndWithdrawHistory/ToDepositHistory";

function AdminDepositHistory() {
  return (
    <ToDepositHistory
      api={"depositUpline"}
      history={selectDepositAdminHistory}
      withDrawFun={fetGetDepositUpline}
      uplineOrDownLine="UpLine"
    />
  );
}

export default AdminDepositHistory;
