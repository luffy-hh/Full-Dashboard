import React, { useEffect } from "react";
import {
  selectCommisionUser,
  filterCommisionUser,
} from "../../../Feactures/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "../CustomBox.module.css";

function UserProfile({ id }) {
  const commisionUser = useSelector(selectCommisionUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterCommisionUser(id));
  }, []);
  const checkMaster = commisionUser?.role === "Master";
  return (
    <>
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

            <p>
              <span className={styles.user_detail_info}>UplineId</span>
              <span>{commisionUser[0]?.uplineId}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
