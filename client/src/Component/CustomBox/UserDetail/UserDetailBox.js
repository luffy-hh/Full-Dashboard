import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectUserDetailData } from "../../../Feactures/modalSlice";
import { selectlogInData } from "../../../Feactures/apiSlice";
import {
  selectMasterGameCat,
  selectMasterSubGameCat,
  fetchGetMasterGameCat,
  fetchGetMasterSubGameCat,
  filterCommisionUser,
  selectCommisionUser,
  selectFilterMasterSubGame,
} from "../../../Feactures/apiSlice";

import { useSelector, useDispatch } from "react-redux";
import UserDetailGameCat from "./UserDetailGameCat";
import { selectEditCommision } from "../../../Feactures/apiSlice";

import styles from "../CustomBox.module.css";
import UserSubGameBox from "./UserSubGameBox";
import UserDetailCom from "./UserDetailCom";

function UserDetailBox() {
  const { id } = useParams();
  const editCommision = useSelector(selectEditCommision);

  useEffect(() => {
    dispatch(filterCommisionUser(id));
  }, []);

  useEffect(() => {
    dispatch(
      fetchGetMasterGameCat({
        api: "mastercatstatus",
        idData: id,
        accessToken,
      })
    );
  }, []);

  const masterSubGameCat = useSelector(selectMasterSubGameCat);
  const dispatch = useDispatch();

  const masterGameCat = useSelector(selectMasterGameCat);
  const commisionUser = useSelector(selectCommisionUser);
  const checkMaster = commisionUser?.role === "Master";
  const filterMasterSubGameCat = useSelector(selectFilterMasterSubGame);

  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  useEffect(() => {
    dispatch(
      fetchGetMasterSubGameCat({
        api: "mastersubcatstatus",
        idData: id,
        accessToken,
      })
    );
  }, [editCommision]);

  const masterGameArr = masterGameCat?.data.allGameCatStatus.categoryStatus;
  const masterSubGameArr =
    masterSubGameCat?.data.allGameSubCatStatus.subCatStatus;
  console.log(masterSubGameArr && masterSubGameArr);

  return (
    <div className="page_style">
      <section>
        {commisionUser && (
          <div className={styles.user_detail_header}>
            <img
              className={styles.user_detail_profile}
              src="https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?auto=format&fit=crop&q=80&w=1482&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="user profile"
            />
            <div className={styles.user_info_box}>
              <p>
                <span className={styles.user_detail_info}>Name</span>
                <span>{commisionUser[0]?.name}</span>
              </p>
              <p>
                <span className={styles.user_detail_info}>
                  {commisionUser[0]?.role} ID
                </span>
                <span>{commisionUser[0]?.userId}</span>
              </p>
              <p>
                <span className={styles.user_detail_info}>Unit</span>
                <span>{commisionUser[0]?.unit}</span>
              </p>
              {checkMaster ? null : (
                <p>
                  <span className={styles.user_detail_info}>Agent Name</span>
                  <span>{commisionUser[0]?.uplineId}</span>
                </p>
              )}
            </div>
          </div>
        )}
        <UserDetailGameCat
          data={masterGameArr}
          masterId={id}
          subGameArr={masterSubGameArr}
        />

        <UserDetailCom
          gameSubGame={masterSubGameArr}
          masterId={id}
          accessToken={accessToken}
        />
      </section>
      <UserSubGameBox masterId={id} />
    </div>
  );
}

export default UserDetailBox;
