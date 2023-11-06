import React from "react";
import {
  selectMasterWithdrawUpLine,
  fetGetMasterWithdrawUpline,
} from "../../../Feactures/bankApiSlice";
import ToWithdrawRequests from "../../ToDepositAndWithdrawHistory/ToWithdrawRequests";

function MasterWithdrawRequest() {
  return (
    <ToWithdrawRequests
      api={"withdarwUpline"}
      editApi={"withdarwUpline"}
      getUpLineFun={fetGetMasterWithdrawUpline}
      upLineData={selectMasterWithdrawUpLine}
    />
  );
}

export default MasterWithdrawRequest;
