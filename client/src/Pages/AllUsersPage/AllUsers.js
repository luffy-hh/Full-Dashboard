import React, { useEffect } from "react";

import AllusersTable from "../Component/AllusersTable";
import NormalButton from "../../Component/NormalButton";
import Container from "../../Component/Container";
import { userBool } from "../../Feactures/ShowHideSlice";
import { userFun } from "../../Feactures/ShowHideSlice";
import AllCreateForm from "../Component/AllCreateForm";
import { userDatas } from "../../Feactures/AllUserPageSlice";
import { useSelector, useDispatch } from "react-redux";
import { userTabledata } from "../../Feactures/AllUserPageSlice";
import { addUser } from "../../Feactures/AllUserPageSlice";
import {
  selectAllUser,
  selectAllUserStatus,
  fetchGetAlluser,
  selectlogInData,
} from "../../Feactures/apiSlice";
import {
  selectAllUserQuery,
  setAllUserQuery,
} from "../../Feactures/ShowHideSlice";
import styles from "./AllUsers.module.css";
import Searchbar from "../../Component/Searchbar/Searchbar";
import CustomBox from "../../Component/CustomBox/CustomBox";
function AllUsers() {
  const showForm = useSelector(userBool);
  const dispatch = useDispatch();
  const userData = useSelector(userDatas);
  const useraddArr = useSelector(userTabledata);
  const allUser = useSelector(selectAllUser);
  const logInData = useSelector(selectlogInData);
  const allUserStatus = useSelector(selectAllUserStatus);
  const allUserQuery = useSelector(selectAllUserQuery);
  const accessToken = logInData.token;

  useEffect(() => {
    dispatch(fetchGetAlluser({ api: "user", accessToken }));
  }, []);

  const allUserArr = allUser && allUser.data.allUsers;

  return (
    <div className={styles.allusesPage}>
      <CustomBox />
      {showForm ? (
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
          {allUserStatus === "succeeded" && (
            <AllusersTable
              data="user"
              dataArr={allUserArr}
              query={allUserQuery}
            />
          )}
        </div>
      ) : (
        <AllCreateForm
          hideFun={userFun}
          data={userData}
          dataArr={useraddArr}
          addComm={addUser}
        />
      )}
    </div>
  );
}

export default AllUsers;
