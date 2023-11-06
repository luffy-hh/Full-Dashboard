import React from "react";
import {
  fetGetMasterWithdraw,
  fetGetMasterWithdrawUpline,
  selectMasterUpandDownHistory,
} from "../../../Feactures/bankApiSlice";
import ToWithdrawHistory from "../../ToDepositAndWithdrawHistory/ToWithdrawHistory";

function AgentWithdrawHistory() {
  return (
    <ToWithdrawHistory
      api={"withdarwUpline"}
      history={selectMasterUpandDownHistory}
      withDrawFun={fetGetMasterWithdrawUpline}
      uplineOrDownLine="DownLine"
      downApi={"withdarwDownline"}
      downFun={fetGetMasterWithdraw}
    />
  );
}

export default AgentWithdrawHistory;
