import React, { useEffect } from "react";
import { Modal } from "antd";
import {
  selectModalUserDetail,
  setModalUserDetail,
  selectUserDetailData,
} from "../../../Feactures/modalSlice";
import {
  selectAgentLayoutShow,
  selectlogInData,
} from "../../../Feactures/apiSlice";
import {
  selectMasterGameCat,
  selectMasterSubGameCat,
  fetchGetMasterGameCat,
  fetchGetMasterSubGameCat,
} from "../../../Feactures/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import UserDetailGameCat from "./UserDetailGameCat";

import styles from "../CustomBox.module.css";
import UserSubGameBox from "./UserSubGameBox";
import UserDetailCom from "./UserDetailCom";

function UserDetailBox({ isMaster }) {
  const modal = useSelector(selectModalUserDetail);
  const userDetailData = useSelector(selectUserDetailData);
  const masterSubGameCat = useSelector(selectMasterSubGameCat);
  const dispatch = useDispatch();
  const checkMaster = isMaster === "master";
  const masterGameCat = useSelector(selectMasterGameCat);

  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  console.log(userDetailData._id);

  useEffect(() => {
    dispatch(
      fetchGetMasterGameCat({
        api: "mastercatstatus",
        idData: userDetailData._id,
        accessToken,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      fetchGetMasterSubGameCat({
        api: "mastersubcatstatus",
        idData: userDetailData._id,
        accessToken,
      })
    );
  }, []);

  const masterGameArr = masterGameCat?.data.allGameCatStatus.categoryStatus;
  const masterSubGameArr =
    masterSubGameCat?.data.allGameSubCatStatus.subCatStatus;
  console.log(masterSubGameArr && masterSubGameArr);

  return (
    <>
      <Modal
        open={modal}
        onOk={() => dispatch(setModalUserDetail(false))}
        onCancel={() => dispatch(setModalUserDetail(false))}
        cancelButtonProps={{ style: { display: "none" } }}
        width={1100}
        okText={"Save"}
        className="modalStyle"
      >
        <section>
          <div className={styles.user_detail_header}>
            <img
              className={styles.user_detail_profile}
              src="https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?auto=format&fit=crop&q=80&w=1482&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="user profile"
            />
            <div className={styles.user_info_box}>
              <p>
                <span className={styles.user_detail_info}>Name</span>
                <span>{userDetailData?.name}</span>
              </p>
              <p>
                <span className={styles.user_detail_info}>
                  {userDetailData?.role} ID
                </span>
                <span>{userDetailData?.userId}</span>
              </p>
              <p>
                <span className={styles.user_detail_info}>Unit</span>
                <span>{userDetailData?.unit}</span>
              </p>
              {checkMaster ? null : (
                <p>
                  <span className={styles.user_detail_info}>Agent Name</span>
                  <span>{userDetailData?.uplineId}</span>
                </p>
              )}
            </div>
          </div>
          <UserDetailGameCat
            data={masterGameArr}
            masterId={userDetailData._id}
          />

          <UserDetailCom gameSubGame={masterSubGameArr} />
        </section>
        <UserSubGameBox masterId={userDetailData._id} />
      </Modal>
    </>
  );
}

export default UserDetailBox;
