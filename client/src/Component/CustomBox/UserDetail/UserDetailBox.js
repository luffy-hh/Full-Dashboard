import React from "react";
import { Modal } from "antd";
import {
  selectModalUserDetail,
  setModalUserDetail,
  selectUserDetailData,
} from "../../../Feactures/modalSlice";
import { useSelector, useDispatch } from "react-redux";

import styles from "../CustomBox.module.css";
import UserDetailGameCat from "./UserDetailGameCat";

function UserDetailBox({ isMaster }) {
  const modal = useSelector(selectModalUserDetail);
  const userDetailData = useSelector(selectUserDetailData);
  const dispatch = useDispatch();
  const checkMaster = isMaster === "master";

  console.log(userDetailData && userDetailData);

  return (
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
        <UserDetailGameCat data={userDetailData} />
      </section>
    </Modal>
  );
}

export default UserDetailBox;
