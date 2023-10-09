import React, { useEffect } from "react";
import {
  fetGetAllTwoDNo,
  selectAllTwoDNo,
  selectAllTwoDNoStatue,
} from "../../../../Feactures/twoDapiSlice";

import { useDispatch, useSelector } from "react-redux";

import styles from "./OneClose.module.css";

// const diableAndEnableNo = [
//   "00",
//   "01",
//   "02",
//   "03",
//   "04",
//   "05",
//   "06",
//   "07",
//   "08",
//   "09",
//   "10",
// ];
// for (let i = 11; i <= 99; i++) {
//   diableAndEnableNo.push(`${i}`);
// }

function DisableandEnable() {
  const dispatch = useDispatch();
  const allTwoDNo = useSelector(selectAllTwoDNo);
  const allTwoDNoStatus = useSelector(selectAllTwoDNoStatue);

  const succeed = allTwoDNoStatus === "succeeded";

  useEffect(() => {
    dispatch(fetGetAllTwoDNo("thai2dmorning12am"));
  }, []);

  const number_list = succeed ? (
    allTwoDNo.data.all2DNumber.map((d, i) => (
      <li key={`box_${i}`}>
        <input type="checkbox" id="box_1" />
        <div>
          <span>{d.number}</span>{" "}
          <span className={styles.no_count}>{d.limitAmount}</span>
        </div>
      </li>
    ))
  ) : (
    <h1>loading</h1>
  );

  return (
    <div className={styles.disable_enable_box}>
      <p className={styles.enabel_box}>
        2 Digit (Disable and Enable selected Number)
      </p>
      <ul className={styles.enable_no_box}>{number_list}</ul>
    </div>
  );
}

export default DisableandEnable;
