import React from "react";
import { useState } from "react";
import styles from "./OpenandClose.module.css";
import OpenandClosePicker from "./OpenandClosePicker";
import Container from "../../../../Component/Container";
import {
  fetchPatchTwoDsetting,
  selectTwoDsettingStatus,
} from "../../../../Feactures/twoDapiSlice";
import { selectlogInData } from "../../../../Feactures/apiSlice";

import NormalButton from "../../../../Component/NormalButton";
import moment from "moment-timezone";

import { useSelector, useDispatch } from "react-redux";

import GivetwoDZa from "../GivetwoDZa/GivetwoDZa";

function OpenandCloseTime() {
  const [openTime, setOpenTime] = useState(new Date());
  const [closeTime, setCloseTime] = useState(new Date());
  const [limitAmount, setLimitAmount] = useState(0);
  const [giveZa,setGiveZa] = useState(0);

  const patchData = {
    startDate: moment(openTime.toString()).tz("Asia/Yangon").format(),
    endDate: moment(closeTime.toString()).tz("Asia/Yangon").format(),
    limitAmount: Number(limitAmount),
    
  };

  console.log(patchData)

  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const twoDsettingStatus = useSelector(selectTwoDsettingStatus);

  const accessToken = logInData.token;

  const handlePost = () => {
    dispatch(
      fetchPatchTwoDsetting({
        api: "lotterysetting/thai2dmorningsetting/updatetime",
        patchData,
        accessToken,
      })
    );
  };

  return (
    <section className={styles.open_close_time}>
      <Container className={`${styles.time_input_box} box_shadow`}>
        <div className={styles.time_input}>
          <p>ပွင့်ချိန်</p>
          <OpenandClosePicker value={openTime} setValue={setOpenTime} />
        </div>
        <div className={styles.time_input}>
          <p>ပိတ်ချိန်</p>
          <OpenandClosePicker value={closeTime} setValue={setCloseTime} />
        </div>
        <div className={styles.time_input}>
          <p>လက်ခံမည့်ပမာဏ</p>
          <input
            type="number"
            className={`input ${styles.open_input}`}
            placeholder="ယူနစ်"
            value={limitAmount}
            onChange={(e) => setLimitAmount(e.target.value)}
          />
        </div>
        <div className={styles.time_input}>
          <p>နစ်လုံးထီအလျော်</p>
          <input
            type="number"
            className={`input ${styles.open_input}`}
            placeholder="ယူနစ်"
            value={giveZa}
            onChange={(e) => setGiveZa(e.target.value)}
          />
        </div>
        
        <NormalButton onClick={handlePost} className={styles.open_btn}>
          {twoDsettingStatus === "loading" ? "Saving" : "Save"}
        </NormalButton>
      </Container>
      <GivetwoDZa />
    </section>
  );
}

export default OpenandCloseTime;

//ပွင့်ချိန် ပိတ်ချိန် မနက်ပိုင်း လက်ခံမည့်ပမာဏ ယူနစ်
