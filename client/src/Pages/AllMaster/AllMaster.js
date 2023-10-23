import React, { useEffect } from "react";
import AllusersTable from "../Component/AllusersTable";
import AllCreateForm from "../Component/AllCreateForm";
import { useSelector, useDispatch } from "react-redux";
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
} from "../../Feactures/apiSlice";
import NormalButton from "../../Component/NormalButton";
import Container from "../../Component/Container";
import { masterDatas } from "../../Feactures/AllUserPageSlice";
import styles from "../AllUsersPage/AllUsers.module.css";
import Searchbar from "../../Component/Searchbar/Searchbar";

function AllMaster() {
  const showMaster = useSelector(masterBool);
  const masterData = useSelector(masterDatas);
  const masterQuery = useSelector(selectMasterQuery);
  const logInData = useSelector(selectlogInData);
  const master = useSelector(selectMaster);
  const masterStatus = useSelector(selectMasterStatus);
  const postMaster = useSelector(selectPostMaster);
  const accessToken = logInData.token;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAllMaster({ api: "user/Master", accessToken }));
  }, [postMaster]);

  const allmasterArr = master?.data.userAll;

  return (
    <div className={styles.allusesPage}>
      {showMaster ? (
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
          {masterStatus === "succeeded" && (
            <AllusersTable
              data="master"
              dataArr={allmasterArr}
              query={masterQuery}
            />
          )}
        </div>
      ) : (
        <AllCreateForm
          hideFun={masterFun}
          data={masterData}
          role="Master"
          postFun={fetchPostAllMaster}
          status={selectPostMasterStatus}
        />
      )}
    </div>
  );
}

export default AllMaster;
