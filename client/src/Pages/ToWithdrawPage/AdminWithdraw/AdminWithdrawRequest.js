import React from "react";
import {
  selectWithdrawUpLine,
  fetGetWithdrawUpline,
} from "../../../Feactures/bankApiSlice";
import ToWithdrawRequests from "../../ToDepositAndWithdrawHistory/ToWithdrawRequests";

function AdminWithdrawRequest() {
  return (
    <ToWithdrawRequests
      api={"withdarwUpline"}
      editApi={"withdarwAdmin"}
      getUpLineFun={fetGetWithdrawUpline}
      upLineData={selectWithdrawUpLine}
    />
  );
}

export default AdminWithdrawRequest;
