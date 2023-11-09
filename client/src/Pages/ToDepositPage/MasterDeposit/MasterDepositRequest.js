import React from "react";
import {
  fetGetMasterDepositUpline,
  selectMasterDepositUpLine,
} from "../../../Feactures/bankApiSlice";
import ToDepositRequest from "../../ToDepositAndWithdrawHistory/ToDepositRequests";

function MasterDepositRequest() {
  return (
    <ToDepositRequest
      api={"depositUpline"}
      editApi={"depositUpline"}
      getUpLineFun={fetGetMasterDepositUpline}
      upLineData={selectMasterDepositUpLine}
    />
  );
}

export default MasterDepositRequest;
