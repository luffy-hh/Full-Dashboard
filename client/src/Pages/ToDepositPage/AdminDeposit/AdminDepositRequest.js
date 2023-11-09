import React from "react";
import {
  fetGetDepositUpline,
  selectDepositUpLine,
} from "../../../Feactures/bankApiSlice";
import ToDepositRequest from "../../ToDepositAndWithdrawHistory/ToDepositRequests";

function AdminDepositRequest() {
  return (
    <ToDepositRequest
      api={"depositUpline"}
      editApi={"depositAdmin"}
      getUpLineFun={fetGetDepositUpline}
      upLineData={selectDepositUpLine}
    />
  );
}

export default AdminDepositRequest;
