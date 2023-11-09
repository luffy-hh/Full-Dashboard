import React from "react";
import {
  selectDepositAdminHistory,
  fetGetDepositUpline,
  fetGetDeposit,
} from "../../../Feactures/bankApiSlice";
import ToDepositHistory from "../../ToDepositAndWithdrawHistory/ToDepositHistory";

function MasterDepositHistory() {
  return (
    <ToDepositHistory
      api={"depositUpline"}
      history={selectDepositAdminHistory}
      withDrawFun={fetGetDepositUpline}
      uplineOrDownLine="DownLine"
      downApi={"depositDownline"}
      downFun={fetGetDeposit}
    />
  );
}

export default MasterDepositHistory;
