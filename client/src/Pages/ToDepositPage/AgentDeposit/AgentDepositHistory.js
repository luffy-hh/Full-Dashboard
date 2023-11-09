import React from "react";
import {
  selectDepositMasterHistory,
  fetGetMasterDepositUpline,
  fetGetMasterDeposit,
} from "../../../Feactures/bankApiSlice";
import ToDepositHistory from "../../ToDepositAndWithdrawHistory/ToDepositHistory";

function AgentDepositHistory() {
  return (
    <ToDepositHistory
      api={"depositUpline"}
      history={selectDepositMasterHistory}
      withDrawFun={fetGetMasterDepositUpline}
      uplineOrDownLine="DownLine"
      downApi={"depositDownline"}
      downFun={fetGetMasterDeposit}
    />
  );
}

export default AgentDepositHistory;
