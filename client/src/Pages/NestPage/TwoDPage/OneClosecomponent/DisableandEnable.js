import React, { useEffect } from "react";
import {
  fetGetAllTwoDNo,
  selectAllTwoDNo,
  selectAllTwoDNoStatue,
  selectPatchCloseNo,
} from "../../../../Feactures/twoDapiSlice";
import CloseNoBox from "../../../../Component/CustomBox/CloseNoBox";
import {
  setModalCloseNo,
  setCloseNoData,
  selectCloseNoData,
} from "../../../../Feactures/modalSlice";
import { selectlogInData } from "../../../../Feactures/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../Component/Spinner/Spinner";
import { FiEdit } from "react-icons/fi";

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

function DisableandEnable({ query, subObj }) {
  const dispatch = useDispatch();
  const allTwoDNo = useSelector(selectAllTwoDNo);
  const allTwoDNoStatus = useSelector(selectAllTwoDNoStatue);
  const logInData = useSelector(selectlogInData);
  const patchCloseNo = useSelector(selectPatchCloseNo);
  const closeNoData = useSelector(selectCloseNoData);

  const accessToken = logInData.token;

  const apiArr = ["lottery2dthai12", "lottery2dThai4:30", "thai3DNumAll"]; //need 3d api

  useEffect(() => {
    dispatch(fetGetAllTwoDNo({ api: apiArr[subObj.index], accessToken }));
  }, [patchCloseNo]);

  const succeed = allTwoDNoStatus === "succeeded";

  const handleEdit = (data) => {
    dispatch(setModalCloseNo(true));
    dispatch(setCloseNoData(data));
  };

  const number_list = succeed ? (
    allTwoDNo.data.lottery2dNumAll
      .filter((val) => {
        if (query === "") {
          return val;
        } else if (val.number.includes(query)) {
          return val;
        }
      })
      .map((d, i) => (
        <li key={d._id} className={`${d.status ? "color_blue" : "color_red"}`}>
          <button className={styles.edit_icon} onClick={() => handleEdit(d)}>
            <FiEdit />
          </button>
          <div className={styles.enable_no_flex}>
            <span>{d.number}</span>
            <span className={styles.enable_limit}>{d.limitAmount}</span>
          </div>
        </li>
      ))
  ) : (
    <Spinner />
  );

  return (
    <>
      {closeNoData && <CloseNoBox api={apiArr[subObj.index]} />}
      <div className={styles.disable_enable_box}>
        <p className={styles.enabel_box}>
          2 Digit (Disable and Enable selected Number)
        </p>
        <ul className={styles.enable_no_box}> {number_list}</ul>
      </div>
    </>
  );
}

export default DisableandEnable;
