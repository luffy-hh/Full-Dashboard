import React, { useEffect } from "react";
import AllusersTable from "../Component/AllusersTable";
import AllCreateForm from "../Component/AllCreateForm";
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
import {
  masterBool,
  masterFun,
  selectMasterQuery,
  setMasterQuery,
} from "../../Feactures/ShowHideSlice";
import {
  selectMaster,
  selectMasterStatus,
  fetchGetAllMaster,
  selectlogInData,
  selectPostMaster,
  selectPostMasterStatus,
  fetchPostAllMaster,
  selectPostTransfer,
  setPostMaster,
  selectBanUser,
} from "../../Feactures/apiSlice";
import NormalButton from "../../Component/NormalButton";
import Container from "../../Component/Container";
import { masterDatas } from "../../Feactures/AllUserPageSlice";
import styles from "../AllUsersPage/AllUsers.module.css";
import Searchbar from "../../Component/Searchbar/Searchbar";
import CustomBox from "../../Component/CustomBox/CustomBox";
import { selectCollapsed } from "../../Feactures/modalSlice";

function AllMaster() {
  const showMaster = useSelector(masterBool);
  const masterData = useSelector(masterDatas);
  const masterQuery = useSelector(selectMasterQuery);
  const logInData = useSelector(selectlogInData);
  const master = useSelector(selectMaster);
  const masterStatus = useSelector(selectMasterStatus);
  const postMaster = useSelector(selectPostMaster);
  const postTransfer = useSelector(selectPostTransfer);
  const descr = useSelector(selectDescr);
  const depositeAmount = useSelector(selectDepositeAmount);
  const withDrawAmount = useSelector(selectWithDrawAmount);
  const condition = useSelector(selectCondition);
  const collapsed = useSelector(selectCollapsed);

  const accessToken = logInData.token;
  const dispatch = useDispatch();
  const banUser = useSelector(selectBanUser);

  useEffect(() => {
    dispatch(fetchGetAllMaster({ api: "user?role=Master", accessToken }));
  }, [postMaster, postTransfer, banUser]);

  const allmasterArr = master?.data.userAll;

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
    dispatch(masterFun());
    dispatch(setPostMaster());
  };

  return (
    <div className={collapsed ? styles.alluser_coll : styles.allusesPage}>
      {showMaster ? (
        <div>
          <div className={`box_shadow ${styles.allusers_container}`}>
            <Container className={styles.allusers_heading}>
              <p>Member</p>
              <Searchbar query={masterQuery} setQuery={setMasterQuery} />
              <NormalButton
                onClick={handleCreate}
                className={styles.add_new_btn}
              >
                Create Master
              </NormalButton>
            </Container>
          </div>
          {masterStatus === "succeeded" && (
            <AllusersTable
              data="master"
              dataArr={allmasterArr}
              query={masterQuery}
              downLine={false}
            />
          )}

          {modalComponent}
        </div>
      ) : (
        <AllCreateForm
          hideFun={masterFun}
          data={masterData}
          role="Master"
          postFun={fetchPostAllMaster}
          status={selectPostMasterStatus}
          upLineData={null}
          postAllUser={postMaster}
        />
      )}
    </div>
  );
}

export default AllMaster;
