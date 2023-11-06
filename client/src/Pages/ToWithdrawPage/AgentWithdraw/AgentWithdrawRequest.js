import React from "react";
import {
  fetGetAgentWithdrawUpline,
  selectAgentWithdrawUpLine,
} from "../../../Feactures/bankApiSlice";
import ToWithdrawRequests from "../../ToDepositAndWithdrawHistory/ToWithdrawRequests";

function AgentWithdrawRequest() {
  return (
    <ToWithdrawRequests
      api={"withdarwUpline"}
      editApi={"withdarwUpline"}
      getUpLineFun={fetGetAgentWithdrawUpline}
      upLineData={selectAgentWithdrawUpLine}
    />
  );
}

export default AgentWithdrawRequest;
