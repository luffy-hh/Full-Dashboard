import React, { useEffect } from "react";
import {
  selectMainUnitData,
  selectMainUnitStatus,
  fetchMainUnit,
} from "../../Feactures/apiSlice";
import styles from "./Navbar.module.css";
import NormalButton from "../../Component/NormalButton";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const mainUnitData = useSelector(selectMainUnitData);
  const mainUnitStatus = useSelector(selectMainUnitStatus);
  // fetching main unit
  const dispatch = useDispatch();
  const amount =
    mainUnitStatus === "succeeded" && mainUnitData.data.mainUnit[0].amount;

  useEffect(() => {
    dispatch(fetchMainUnit("mainUnit"));
  }, []);
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
