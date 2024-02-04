import React, { useEffect, useState } from "react";
import styles from "./CreateShanForm.module.css";
import NormalButton from "../../Component/NormalButton";
import { selectlogInData } from "../../Feactures/apiSlice";
import { selectShanRoll, fetGetShanRoll } from "../../Feactures/shan";

import { useSelector, useDispatch } from "react-redux";

function ShanRoll() {
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const shanRoll = useSelector(selectShanRoll);

  useEffect(() => {
    dispatch(fetGetShanRoll({ api: `shanrole`, accessToken }));
  }, []);

  const allRole = shanRoll.data?.allShanRole;

  const list = allRole?.map((d) => (
    <div key={d._id} className={styles.shan_roll_card}>
      <img src="/img/diamond.jpg" alt="grade_photo" />
      <div className={styles.shan_roll_description}>
        <p>{d.role_name}</p>
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
