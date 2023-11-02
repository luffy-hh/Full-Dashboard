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
} from "../../Feactures/apiSlice";
import NormalButton from "../../Component/NormalButton";
import Container from "../../Component/Container";
import { masterDatas } from "../../Feactures/AllUserPageSlice";
import styles from "../AllUsersPage/AllUsers.module.css";
import Searchbar from "../../Component/Searchbar/Searchbar";
import CustomBox from "../../Component/CustomBox/CustomBox";

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

  const accessToken = logInData.token;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAllMaster({ api: "user/Master", accessToken }));
  }, [postMaster, postTransfer]);

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

  return (
    <div className={styles.allusesPage}>
      {showMaster ? (
        <div>
          <div className={`box_shadow ${styles.allusers_container}`}>
            <Container className={styles.allusers_heading}>
              <p>Member</p>
              <Searchbar query={masterQuery} setQuery={setMasterQuery} />
              <NormalButton
                onClick={() => dispatch(masterFun())}
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
        />
      )}
    </div>
  );
}

export default AllMaster;
