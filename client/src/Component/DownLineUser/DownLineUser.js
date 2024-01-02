import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  selectDownLineAgent,
  fetGetDownLineAgent,
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
import {
  setAllUserQuery,
  selectAllUserQuery,
} from "../../Feactures/ShowHideSlice";
import { userDatas } from "../../Feactures/AllUserPageSlice";

import {
  selectPostTransfer,
  selectPostUserStatus,
  postAlluser,
  selectPostUser,
  selectPostTransferToUser,
  setPostUser,
} from "../../Feactures/apiSlice";

import NormalButton from "../NormalButton";
import {
  selectShowDwonLineAgent,
  setDownLineAgent,
} from "../../Feactures/ShowHideSlice";
import CustomBox from "../CustomBox/CustomBox";

import Container from "../Container";
import Searchbar from "../Searchbar/Searchbar";
import AllusersTable from "../../Pages/Component/AllusersTable";
import styles from "../../Pages/AllUsersPage/AllUsers.module.css";
import AllDownLineCreateForm from "../../Pages/Component/AllDownLineCreateForm";

function DownLineUser() {
  const dispatch = useDispatch();
  const downLineAgent = useSelector(selectDownLineAgent);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const userId = logInData.user._id;
  const showDownLineAgent = useSelector(selectShowDwonLineAgent);
  const postUser = useSelector(selectPostUser);
  const postTransferToUser = useSelector(selectPostTransferToUser);

  const depositeAmount = useSelector(selectDepositeAmount);
  const withDrawAmount = useSelector(selectWithDrawAmount);
  const condition = useSelector(selectCondition);
  const postTransfer = useSelector(selectPostTransfer);
  const descr = useSelector(selectDescr);

  const userData = useSelector(userDatas);
  const userQuery = useSelector(selectAllUserQuery);

  useEffect(() => {
    dispatch(
      fetGetDownLineAgent({ api: `downlineUser/${userId}`, accessToken })
    );
  }, [postTransfer, postUser, postTransferToUser]);

  const handleCreate = () => {
    dispatch(setPostUser());
    dispatch(setDownLineAgent());
  };

  const userList = downLineAgent?.data.downlineObj;

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
      {showDownLineAgent ? (
        <div>
          <div className={`box_shadow ${styles.allusers_container}`}>
            <Container className={styles.allusers_heading}>
              <p>Member</p>
              <Searchbar query={userQuery} setQuery={setAllUserQuery} />
              <NormalButton
                onClick={handleCreate}
                className={styles.add_new_btn}
              >
                Create User
              </NormalButton>
            </Container>
          </div>
          {userList && (
            <AllusersTable
              data="agent"
              dataArr={userList}
              query={userQuery}
              downLine={false}
            />
          )}
          {modalComponent}
        </div>
      ) : (
        <AllDownLineCreateForm
          hideFun={setDownLineAgent}
          data={userData}
          role="User"
          postFun={postAlluser}
          status={selectPostUserStatus}
          postObj={postUser}
        />
      )}
    </div>
  );
}

export default DownLineUser;
