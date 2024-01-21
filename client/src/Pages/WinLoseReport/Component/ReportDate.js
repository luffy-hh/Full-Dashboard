import React, { useState } from "react";
import { DatePicker } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import NormalButton from "../../../Component/NormalButton";
import styles from "./ReportTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSlotAllUser,
  fetchSlotUserDetail,
  fetchSlotUserRecord,
} from "../../../Feactures/slotSlice";

import {
  selectlogInData,
  fetGetTransationRecord,
} from "../../../Feactures/apiSlice";

const chnageDateFormat = (data) => {
  const dateObject = new Date(data);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = dateObject.getDate().toString().padStart(2, "0");
  const outputDate = `${year}-${month}-${day}`;
  return outputDate;
};

function ReportDate({ condition, id, gameapi }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userID, setUserID] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  console.log(startDate);

  const startOnChange = (date) => {
    setStartDate(chnageDateFormat(new Date(date).toLocaleDateString()));
  };

  const endOnChange = (date) => {
    setEndDate(chnageDateFormat(new Date(date).toLocaleDateString()));
  };

  const handleDate = (e) => {
    e.preventDefault();

    if ((startDate && endDate) || type || userID) {
      if (condition === "alluser") {
        dispatch(
          fetchSlotAllUser({
            api: `slotegrator/users/reports?${
              startDate ? `start_date=${startDate}&` : ""
            }${endDate ? `end_date=${endDate}&` : ""}${
              userID ? `userId=${userID}` : ""
            }`,
            accessToken,
          })
        );
      } else if (condition === "oneuser") {
        dispatch(
          fetchSlotUserDetail({
            api: `slotegrator/users/reports-detail?userId=${id}&${
              startDate ? `start_date=${startDate}&` : ""
            }${endDate ? `end_date=${endDate}&` : ""}${
              type ? `search=${type}` : ""
            }`,
            accessToken,
          })
        );
      } else if (condition === "transation") {
        dispatch(
          fetGetTransationRecord({
            api: `${gameapi}&createdAt[gte]=${startDate}&createdAt[lte]=${endDate}`,
            accessToken,
          })
        );
      } else {
        dispatch(
          fetchSlotUserRecord({
            api: `${gameapi}&start_date=${startDate}&end_date=${endDate}`,
            accessToken,
          })
        );
      }
    } else {
      alert("Fill start date and end date");
    }
  };

  return (
    <form className={styles.report_date}>
      <div>
        <label>From</label>
        <DatePicker
          onChange={startOnChange}
          placeholder="Start Date"
          style={{ width: "20rem" }}
        />
      </div>
      <div>
        <label>To</label>
        <DatePicker
          onChange={endOnChange}
          placeholder="End Date"
          style={{ width: "20rem" }}
        />
      </div>
      {condition === "alluser" ? (
        <div>
          <label>ID</label>
          <input
            className={styles.input_id}
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            placeholder="User Id"
          />
        </div>
      ) : condition === "oneuser" ? (
        <div>
          <label>Type</label>
          <input
            className={styles.input_id}
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Game Type"
          />
        </div>
      ) : null}
      <NormalButton
        onClick={(e) => handleDate(e)}
        className={`${styles.report_date_save} btn_hover`}
      >
        Submit
      </NormalButton>
    </form>
  );
}

export default ReportDate;
