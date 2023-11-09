import React from "react";
import {
  fetGetAgentDepositUpline,
  selectAgentDepositUpLine,
} from "../../../Feactures/bankApiSlice";
import ToDepositRequest from "../../ToDepositAndWithdrawHistory/ToDepositRequests";

function AgentDepositRequest() {
  return (
    <ToDepositRequest
      api={"depositUpline"}
      editApi={"depositUpline"}
      getUpLineFun={fetGetAgentDepositUpline}
      upLineData={selectAgentDepositUpLine}
    />
  );
}

export default AgentDepositRequest;
