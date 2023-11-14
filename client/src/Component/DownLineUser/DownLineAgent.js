import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  selectDownLineMaster,
  fetGetDownLineMaster,
  selectlogInData,
} from "../../Feactures/apiSlice";
import {
  selectDepositeAmount,
  selectWithDrawAmount,
  selectCondition,
  selectDescr,
  setWithDrawAmount,
  setAmount,
  setDescr,
} from "../../Feactures/modalSlice";
import { setAgentQuery, selectAgentQuery } from "../../Feactures/ShowHideSlice";
import { selectAgentData } from "../../Feactures/AllUserPageSlice";
import {
  selectPostTransfer,
  fetchPostAllAgent,
  selectPostAgentStatus,
  selectPostAgent,
} from "../../Feactures/apiSlice";
import NormalButton from "../NormalButton";
import {
  selectShowDownLineMaster,
  setDownLineMaster,
} from "../../Feactures/ShowHideSlice";
import CustomBox from "../CustomBox/CustomBox";

import Container from "../Container";
import Searchbar from "../Searchbar/Searchbar";
import AllusersTable from "../../Pages/Component/AllusersTable";
import styles from "../../Pages/AllUsersPage/AllUsers.module.css";
import AllDownLineCreateForm from "../../Pages/Component/AllDownLineCreateForm";

function DownLineAgent() {
  const dispatch = useDispatch();
  const downLineMaster = useSelector(selectDownLineMaster);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const userId = logInData.user._id;
  const showDownLineMaster = useSelector(selectShowDownLineMaster);
  const postAgent = useSelector(selectPostAgent);

  const depositeAmount = useSelector(selectDepositeAmount);
  const withDrawAmount = useSelector(selectWithDrawAmount);
  const condition = useSelector(selectCondition);
  const postTransfer = useSelector(selectPostTransfer);
  const descr = useSelector(selectDescr);

  const agentData = useSelector(selectAgentData);
  const agentQuery = useSelector(selectAgentQuery);

  useEffect(() => {
    dispatch(
      fetGetDownLineMaster({ api: `downlineUser/${userId}`, accessToken })
    );
  }, [postTransfer, postAgent]);

  const agentList = downLineMaster?.data.downlineObj;

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
    <div className="page_style" style={{ overflow: "hidden" }}>
      {showDownLineMaster ? (
        <div>
          <div className={`box_shadow ${styles.allusers_container}`}>
            <Container className={styles.allusers_heading}>
              <p>Member</p>
              <Searchbar query={agentQuery} setQuery={setAgentQuery} />
              <NormalButton
                onClick={() => dispatch(setDownLineMaster())}
                className={styles.add_new_btn}
              >
                Create Agent
              </NormalButton>
            </Container>
          </div>
          {agentList && (
            <AllusersTable
              data="agent"
              dataArr={agentList}
              query={agentQuery}
              downLine={true}
            />
          )}
          {modalComponent}
        </div>
      ) : (
        <AllDownLineCreateForm
          hideFun={setDownLineMaster}
          data={agentData}
          role="Agent"
          postFun={fetchPostAllAgent}
          status={selectPostAgentStatus}
        />
      )}
    </div>
  );
}

export default DownLineAgent;
