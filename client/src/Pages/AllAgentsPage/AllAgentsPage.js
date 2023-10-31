import React, { useEffect } from "react";

import NormalButton from "../../Component/NormalButton";
import Container from "../../Component/Container";
import AllusersTable from "../Component/AllusersTable";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDepositeAmount,
  setAmount,
  selectWithDrawAmount,
  setWithDrawAmount,
  selectCondition,
  setDescr,
  selectDescr,
} from "../../Feactures/modalSlice";
import CustomBox from "../../Component/CustomBox/CustomBox";
import {
  selectAgent,
  agentFun,
  selectAgentQuery,
  setAgentQuery,
} from "../../Feactures/ShowHideSlice";
import { selectAgentData } from "../../Feactures/AllUserPageSlice";
import AllCreateForm from "../Component/AllCreateForm";
import styles from "../AllUsersPage/AllUsers.module.css";
import Searchbar from "../../Component/Searchbar/Searchbar";
import {
  selectAgents,
  selectAgentStatus,
  fetchGetAllAgent,
  selectlogInData,
  fetchPostAllAgent,
  selectPostAgent,
  selectPostAgentStatus,
  selectForMasterList,
  selectPostTransfer,
} from "../../Feactures/apiSlice";

function AllAgentsPage() {
  const dispatch = useDispatch();
  const agent = useSelector(selectAgent);
  const agentData = useSelector(selectAgentData);
  const agentQuery = useSelector(selectAgentQuery);
  const agents = useSelector(selectAgents);
  const agentStatus = useSelector(selectAgentStatus);
  const logInData = useSelector(selectlogInData);
  const postAgent = useSelector(selectPostAgent);
  const masterList = useSelector(selectForMasterList);
  const accessToken = logInData.token;

  const depositeAmount = useSelector(selectDepositeAmount);
  const withDrawAmount = useSelector(selectWithDrawAmount);
  const condition = useSelector(selectCondition);
  const postTransfer = useSelector(selectPostTransfer);
  const descr = useSelector(selectDescr);

  useEffect(() => {
    dispatch(fetchGetAllAgent({ api: "user/Agent", accessToken }));
  }, [postAgent, postTransfer]);

  const agentArr = agents?.data.userAll;

  const modalComponent =
    condition === "DEP" ? (
      <CustomBox
        title="Deposite Unit"
        amount={depositeAmount}
        setAmount={setAmount}
        descr={descr}
        setDescr={setDescr}
      />
    ) : (
      <CustomBox
        title="Withdraw Unit"
        amount={withDrawAmount}
        setAmount={setWithDrawAmount}
        descr={descr}
        setDescr={setDescr}
      />
    );

  return (
    <div className={styles.allusesPage}>
      {agent ? (
        <div className={`box_shadow ${styles.allusers_container}`}>
          <Container className={styles.allusers_heading}>
            <p>Member</p>
            <Searchbar query={agentQuery} setQuery={setAgentQuery} />
            <NormalButton
              onClick={() => dispatch(agentFun())}
              className={styles.add_new_btn}
            >
              Create Agent
            </NormalButton>
          </Container>

          {agentStatus === "succeeded" && (
            <AllusersTable data="agent" dataArr={agentArr} query={agentQuery} />
          )}
          {modalComponent}
        </div>
      ) : (
        <AllCreateForm
          hideFun={agentFun}
          data={agentData}
          role="Agent"
          postFun={fetchPostAllAgent}
          status={selectPostAgentStatus}
          upLineData={masterList}
        />
      )}
    </div>
  );
}

export default AllAgentsPage;
