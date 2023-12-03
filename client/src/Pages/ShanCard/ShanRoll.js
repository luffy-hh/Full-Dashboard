import React, { useEffect } from "react";
import styles from "./CreateShanForm.module.css";
import NormalButton from "../../Component/NormalButton";
import { selectlogInData } from "../../Feactures/apiSlice";
import {
  fetGetShanRoll,
  selectShanRoll,
  selectPostShanRoll,
} from "../../Feactures/shan";
import { useSelector, useDispatch } from "react-redux";

function ShanRoll() {
  const dispatch = useDispatch();
  const shanRoll = useSelector(selectShanRoll);
  const logInData = useSelector(selectlogInData);
  const postShanRoll = useSelector(selectPostShanRoll);
  const accessToken = logInData.token;

  useEffect(() => {
    dispatch(fetGetShanRoll({ api: "shanroll", accessToken }));
  }, [postShanRoll]);

  const shanRollData = shanRoll?.data.allShanRoll;

  const list = shanRollData?.map((d) => (
    <div className={styles.shan_roll_card}>
      <img src="/img/diamond.jpg" alt="grade_photo" />
      <div className={styles.shan_roll_description}>
        <p>{d.description}</p>
        <p className={styles.min_max_amount}>
          <span>Max Amount</span> <span>{d.max_amount}</span>
        </p>
        <p className={styles.min_max_amount}>
          <span>Min Amount</span> <span>{d.min_amount}</span>
        </p>
        <NormalButton className={`btn_hover ${styles.create_btn}`}>
          Edit
        </NormalButton>
      </div>
    </div>
  ));

  return <div className={styles.shan_roll_container}>{list}</div>;
}

export default ShanRoll;
