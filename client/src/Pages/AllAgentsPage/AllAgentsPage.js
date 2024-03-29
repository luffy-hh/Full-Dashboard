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
  selectCollapsed,
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
  fetchGetAllMaster,
  setPostAgent,
  selectBanUser,
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
  const collapsed = useSelector(selectCollapsed);
  const banUser = useSelector(selectBanUser);

  useEffect(() => {
    dispatch(fetchGetAllAgent({ api: "user?role=Agent", accessToken }));
  }, [postAgent, postTransfer, banUser]);

  useEffect(() => {
    dispatch(fetchGetAllMaster({ api: "user?role=Master", accessToken }));
  }, []);

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

  const handleCreate = () => {
    dispatch(agentFun());
    dispatch(setPostAgent());
  };

  return (
    <div className={collapsed ? styles.alluser_coll : styles.allusesPage}>
      {agent ? (
        <div>
          <div className={`box_shadow ${styles.allusers_container}`}>
            <Container className={styles.allusers_heading}>
              <p>Member</p>
              <Searchbar query={agentQuery} setQuery={setAgentQuery} />
              <NormalButton
                onClick={handleCreate}
                className={styles.add_new_btn}
              >
                Create Agent
              </NormalButton>
            </Container>
          </div>
          {agentStatus === "succeeded" && (
            <AllusersTable
              data="agent"
              dataArr={agentArr}
              query={agentQuery}
              downLine={false}
            />
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
          postAllUser={postAgent}
        />
      )}
    </div>
  );
}

export default AllAgentsPage;
