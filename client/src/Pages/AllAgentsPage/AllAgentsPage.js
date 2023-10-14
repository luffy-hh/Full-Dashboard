import React, { useEffect } from "react";

import NormalButton from "../../Component/NormalButton";
import Container from "../../Component/Container";
import AllusersTable from "../Component/AllusersTable";
import { useSelector, useDispatch } from "react-redux";
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
  const accessToken = logInData.token;

  useEffect(() => {
    dispatch(fetchGetAllAgent({ api: "user/Agent", accessToken }));
  }, [postAgent]);

  const agentArr = agents && agents.data.userAll;
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
        </div>
      ) : (
        <AllCreateForm
          hideFun={agentFun}
          data={agentData}
          role="Agent"
          postFun={fetchPostAllAgent}
          status={selectPostAgentStatus}
        />
      )}
    </div>
  );
}

export default AllAgentsPage;
