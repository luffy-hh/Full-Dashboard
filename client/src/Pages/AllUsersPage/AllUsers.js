import React, { useEffect } from "react";

import AllusersTable from "../Component/AllusersTable";
import NormalButton from "../../Component/NormalButton";
import Container from "../../Component/Container";
import { userBool } from "../../Feactures/ShowHideSlice";
import { userFun } from "../../Feactures/ShowHideSlice";
import AllCreateForm from "../Component/AllCreateForm";
import { userDatas } from "../../Feactures/AllUserPageSlice";
import { useSelector, useDispatch } from "react-redux";

import {
  selectAllUser,
  selectAllUserStatus,
  fetchGetAlluser,
  selectlogInData,
  postAlluser,
  selectPostUser,
  selectPostUserStatus,
  selectPostTransfer,
  selectForAgentList,
} from "../../Feactures/apiSlice";
import {
  selectAllUserQuery,
  setAllUserQuery,
} from "../../Feactures/ShowHideSlice";

import {
  selectDepositeAmount,
  setAmount,
  selectWithDrawAmount,
  setWithDrawAmount,
  setDescr,
  selectDescr,
  selectCondition,
} from "../../Feactures/modalSlice";
import styles from "./AllUsers.module.css";
import Searchbar from "../../Component/Searchbar/Searchbar";
import CustomBox from "../../Component/CustomBox/CustomBox";
function AllUsers() {
  const showForm = useSelector(userBool);
  const dispatch = useDispatch();
  const userData = useSelector(userDatas);
  const postUser = useSelector(selectPostUser);
  const postTransfer = useSelector(selectPostTransfer);

  const allUser = useSelector(selectAllUser);
  const logInData = useSelector(selectlogInData);
  const allUserStatus = useSelector(selectAllUserStatus);
  const allUserQuery = useSelector(selectAllUserQuery);
  const condition = useSelector(selectCondition);
  const depositeAmount = useSelector(selectDepositeAmount);
  const withDrawAmount = useSelector(selectWithDrawAmount);
  const descr = useSelector(selectDescr);
  const agentList = useSelector(selectForAgentList);

  const accessToken = logInData.token;

  useEffect(() => {
    dispatch(fetchGetAlluser({ api: "user/User", accessToken }));
  }, [postUser, postTransfer]);

  const allUserArr = allUser?.data.userAll;

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

  console.log(withDrawAmount);
  console.log(depositeAmount);

  return (
    <div className={styles.allusesPage}>
      {showForm ? (
        <div>
          <div className={`box_shadow ${styles.allusers_container}`}>
            <Container className={styles.allusers_heading}>
              <p>Member</p>
              <Searchbar query={allUserQuery} setQuery={setAllUserQuery} />
              <NormalButton
                className={styles.add_new_btn}
                onClick={() => dispatch(userFun())}
              >
                Create User
              </NormalButton>
            </Container>
          </div>
          {allUserStatus === "succeeded" && (
            <AllusersTable
              data="user"
              dataArr={allUserArr}
              query={allUserQuery}
            />
          )}

          {modalComponent}
        </div>
      ) : (
        <AllCreateForm
          hideFun={userFun}
          data={userData}
          role="User"
          postFun={postAlluser}
          status={selectPostUserStatus}
          upLineData={agentList}
        />
      )}
    </div>
  );
}

export default AllUsers;
