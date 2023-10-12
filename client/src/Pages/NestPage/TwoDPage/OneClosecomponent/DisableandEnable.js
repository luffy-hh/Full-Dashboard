import React, { useEffect } from "react";
import {
  fetGetAllTwoDNo,
  selectAllTwoDNo,
  selectAllTwoDNoStatue,
} from "../../../../Feactures/twoDapiSlice";
import { selectlogInData } from "../../../../Feactures/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../Component/Spinner/Spinner";
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

function DisableandEnable({ query }) {
  const dispatch = useDispatch();
  const allTwoDNo = useSelector(selectAllTwoDNo);
  const allTwoDNoStatus = useSelector(selectAllTwoDNoStatue);
  const logInData = useSelector(selectlogInData);

  const accessToken = logInData.token;

  const succeed = allTwoDNoStatus === "succeeded";

  useEffect(() => {
    dispatch(fetGetAllTwoDNo({ api: "thai2dmorning12am", accessToken }));
  }, []);

  const number_list = succeed ? (
    allTwoDNo.data.all2DNumber
      .filter((val) => {
        if (query === "") {
          return val;
        } else if (val.number.includes(query)) {
          return val;
        }
      })
      .map((d, i) => (
        <li key={d._id}>
          <label htmlFor={`box_${i}`} className={styles.container}>
            <input type="checkbox" id={`box_${i}`} />
            <span className={styles.checkmark}></span>
            <div>
              <span className={styles.disable_no}>{d.number}</span>
              <span className={styles.no_count}>{d.limitAmount}</span>
            </div>
          </label>
        </li>
      ))
  ) : (
    <Spinner />
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
