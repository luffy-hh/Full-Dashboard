import React, { useEffect } from "react";
import {
  selectMainUnitData,
  selectMainUnitStatus,
  fetchMainUnit,
  selectlogInData,
} from "../../Feactures/apiSlice";
import { selectPostTransfer } from "../../Feactures/apiSlice";
import styles from "./Navbar.module.css";
import NormalButton from "../../Component/NormalButton";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const mainUnitData = useSelector(selectMainUnitData);
  const mainUnitStatus = useSelector(selectMainUnitStatus);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const postTransfer = useSelector(selectPostTransfer)
  // fetching main unit
  const dispatch = useDispatch();
  const amount =
    mainUnitStatus === "succeeded" && mainUnitData.data.mainUnitValue.mainUnit;

  useEffect(() => {
    dispatch(fetchMainUnit({ api: "mainunit", accessToken }));
  }, [postTransfer]);
  return (
    <nav className={styles.navHead}>
      <div className={styles.myadmin}>
        <h3>MyAdmin</h3>
      </div>
      <NormalButton className={styles.main_unit_btn}>
        Main Unit -
        <span style={{ marginLeft: "1.2rem" }}>
          {mainUnitStatus === "loading" ? "loading" : amount}
        </span>
      </NormalButton>
    </nav>
  );
}

export default Navbar;
