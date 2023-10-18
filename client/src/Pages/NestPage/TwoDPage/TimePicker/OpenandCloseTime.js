import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./OpenandClose.module.css";
import OpenandClosePicker from "./OpenandClosePicker";
import Container from "../../../../Component/Container";
import {
  fetchPatchLotterySetting,
  selectPatchLotterySettingStatus,
  fetchGetLotterySetting,
  selectGetLotterySetting,
  selectGetLotterySettingStatus,
  selectPatchLotterySetting,
} from "../../../../Feactures/twoDapiSlice";
import { selectlogInData } from "../../../../Feactures/apiSlice";
import { Switch } from "antd";
import NormalButton from "../../../../Component/NormalButton";
import moment from "moment-timezone";

import { useSelector, useDispatch } from "react-redux";

function OpenandCloseTime() {
  const [openTime, setOpenTime] = useState(new Date());
  const [closeTime, setCloseTime] = useState(new Date());
  const [limitAmount, setLimitAmount] = useState(0);
  const [giveZa, setGiveZa] = useState(0);
  const [status, setStatus] = useState(true);

  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);

  const patchLotterySettingStatus = useSelector(
    selectPatchLotterySettingStatus
  );
  const getLotterySetting = useSelector(selectGetLotterySetting);
  const getLotterySettingStatus = useSelector(selectGetLotterySettingStatus);
  const patchLotterySetting = useSelector(selectPatchLotterySetting);

  const accessToken = logInData.token;

  useEffect(() => {
    dispatch(fetchGetLotterySetting({ api: "lotterysetting", accessToken }));
  }, [patchLotterySetting]);

  const currentAmount =
    getLotterySettingStatus === "succeeded" &&
    getLotterySetting.data.showLotterySettingAll[0].limitAmount;

  const currentData =
    getLotterySetting && getLotterySetting.data.showLotterySettingAll[0];
  const lotterySettingId =
    getLotterySetting && getLotterySetting.data.showLotterySettingAll[0]._id;

  const patchData = {
    startDate: moment(openTime.toString()).tz("Asia/Yangon").format(),
    endDate: moment(closeTime.toString()).tz("Asia/Yangon").format(),
    limitAmount:
      Number(limitAmount) === 0 ? currentAmount : Number(limitAmount),
    status,
    mainCompensation: Number(giveZa),
  };

  const handlePost = () => {
    dispatch(
      fetchPatchLotterySetting({
        api: `lotterysetting/${lotterySettingId}`,
        patchData,
        accessToken,
      })
    );
  };

  console.log(patchData);

  return (
    <section className={styles.open_close_time}>
      <div className={styles.open_close_flex}>
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
              value={giveZa}
              onChange={(e) => setGiveZa(e.target.value)}
            />
          </div>
          <div className={styles.time_input}>
            <p>Status</p>
            <Switch
              defaultChecked={status}
              onChange={() => setStatus(!status)}
            />
          </div>

          <NormalButton onClick={handlePost} className={styles.open_btn}>
            {patchLotterySettingStatus === "loading" ? "Saving" : "Save"}
          </NormalButton>
        </Container>
        {getLotterySettingStatus === "succeeded" ? (
          <Container className={`box_shadow ${styles.show_data}`}>
            <p>
              Open Time == {new Date(currentData.startDate).toLocaleString()}{" "}
            </p>
            <p>
              Close Time == {new Date(currentData.endDate).toLocaleString()}
            </p>
            <p>Limit Amount == {currentAmount}</p>
            <p>Main Compensation == {currentData.mainCompensation}</p>
          </Container>
        ) : (
          "Loading"
        )}
      </div>
    </section>
  );
}

export default OpenandCloseTime;

//ပွင့်ချိန် ပိတ်ချိန် မနက်ပိုင်း လက်ခံမည့်ပမာဏ ယူနစ်
