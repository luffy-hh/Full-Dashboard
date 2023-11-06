import React from "react";
import ToWithdrawHistory from "../../ToDepositAndWithdrawHistory/ToWithdrawHistory";
import {
  fetGetWithdrawUpline,
  fetGetwithdraw,
  selectAdminUpandDownHistory,
} from "../../../Feactures/bankApiSlice";

function MasterWithdrawHistory() {
  return (
    <ToWithdrawHistory
      api={"withdarwUpline"}
      history={selectAdminUpandDownHistory}
      withDrawFun={fetGetWithdrawUpline}
      uplineOrDownLine="DownLine"
      downApi={"withdarwDownline"}
      downFun={fetGetwithdraw}
    />
  );
}

export default MasterWithdrawHistory;
