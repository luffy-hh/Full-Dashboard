import React from "react";
import AllusersTable from "../Component/AllusersTable";
import AllCreateForm from "../Component/AllCreateForm";
import { useSelector, useDispatch } from "react-redux";
import { masterBool } from "../../Feactures/ShowHideSlice";
import { masterFun } from "../../Feactures/ShowHideSlice";
import NormalButton from "../../Component/NormalButton";
import Container from "../../Component/Container";
import { masterDatas } from "../../Feactures/AllUserPageSlice";
import { addCommision } from "../../Feactures/AllUserPageSlice";
import { commisionTable } from "../../Feactures/AllUserPageSlice";
import styles from "./AllMaster.module.css";

function AllMaster() {
  const showMaster = useSelector(masterBool);
  const masterData = useSelector(masterDatas);
  const dispatch = useDispatch();

  const commisionDataArr = useSelector(commisionTable);

  return (
    <div className={styles.all_master_page}>
      {showMaster ? (
        <div>
          <Container className={styles.allusers_heading}>
            <p>Member</p>
            <NormalButton
              onClick={() => dispatch(masterFun())}
              className={styles.add_new_btn}
            >
              Create Master
            </NormalButton>
          </Container>
          <AllusersTable data="master" />
        </div>
      ) : (
        <AllCreateForm
          hideFun={masterFun}
          data={masterData}
          dataArr={commisionDataArr}
          addComm={addCommision}
        />
      )}
    </div>
  );
}

export default AllMaster;
