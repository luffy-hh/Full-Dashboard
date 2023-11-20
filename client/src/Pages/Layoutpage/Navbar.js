import React, { useEffect } from "react";
import {
  selectMainUnitData,
  fetGetUserProfile,
  selectUserProfile,
  fetchMainUnit,
  selectlogInData,
  selectPostTransferToUser,
} from "../../Feactures/apiSlice";
import { selectPostTransfer } from "../../Feactures/apiSlice";
import styles from "./Navbar.module.css";
import NormalButton from "../../Component/NormalButton";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const mainUnitData = useSelector(selectMainUnitData);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const role = logInData.user.role;
  const userName = logInData.user.name;

  const postTransfer = useSelector(selectPostTransfer);
  const postTransferToUser = useSelector(selectPostTransferToUser);
  const userProfile = useSelector(selectUserProfile);

  // fetching main unit
  const dispatch = useDispatch();

  useEffect(() => {
    if (role === "Admin") {
      dispatch(fetchMainUnit({ api: "mainunit", accessToken }));
    } else {
      dispatch(fetGetUserProfile({ api: "userProfile", accessToken }));
    }
  }, [postTransfer, postTransferToUser]);

  const amount = mainUnitData?.data.mainUnitValue.mainUnit;
  const unit = userProfile?.data.currentUser.unit;

  const amountData = role === "Admin" ? amount : unit;

  return (
    <nav className={`${styles.navHead}`}>
      <div className={styles.myadmin}>
        <h3>
          {userName} ({role})
        </h3>
      </div>
      <NormalButton className={styles.main_unit_btn}>
        Main Unit -<span style={{ marginLeft: "1.2rem" }}>{amountData}</span>
      </NormalButton>
    </nav>
  );
}

export default Navbar;
