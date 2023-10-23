import React, { useEffect } from "react";
import AllusersTable from "../Component/AllusersTable";
import NormalButton from "../../Component/NormalButton";
import Container from "../../Component/Container";
import { adminBool, adminFun } from "../../Feactures/ShowHideSlice";
import { useSelector, useDispatch } from "react-redux";
import Form from "../Component/NormalForm/Form";
import { adminDatas } from "../../Feactures/AllUserPageSlice";
import {
  selectAllAdmin,
  selectAllAdminStatus,
  fetchGetAlladmin,
  selectlogInData,
} from "../../Feactures/apiSlice";

import styles from "./AllAdmin.module.css";

function AllAdmin() {
  const adminshow = useSelector(adminBool);
  const dispatch = useDispatch();
  const allAdmin = useSelector(selectAllAdmin);
  const allAdminStatus = useSelector(selectAllAdminStatus);
  const logInData = useSelector(selectlogInData);
  const data = useSelector(adminDatas);
  const accessToken = logInData.token;

  const succeeded = allAdminStatus === "succeeded";

  useEffect(() => {
    dispatch(fetchGetAlladmin({ api: "user/Admin", accessToken }));
  }, []);

  const adminArr = allAdmin?.data.userAll;

  return (
    <div className={styles.all_admin_page}>
      {adminshow ? (
        <div className={styles.all_admin_container}>
          <Container className={styles.allusers_heading}>
            <p>Member</p>

            <NormalButton
              onClick={() => dispatch(adminFun())}
              className={styles.add_new_btn}
            >
              Create Admin
            </NormalButton>
          </Container>
          {succeeded && (
            <AllusersTable data="admin" dataArr={adminArr} query="" />
          )}
        </div>
      ) : (
        <Form hideFun={adminFun} data={data} />
      )}
    </div>
  );
}

export default AllAdmin;
