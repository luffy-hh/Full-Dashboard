import React, { useState } from "react";
import { DatePicker } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import NormalButton from "../../../Component/NormalButton";
import styles from "./ReportTable.module.css";
import { useDispatch } from "react-redux";
import {
  fetchSlotAllUser,
  fetchSlotUserDetail,
} from "../../../Feactures/slotSlice";

const chnageDateFormat = (data) => {
  const dateObject = new Date(data);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = dateObject.getDate().toString().padStart(2, "0");
  const outputDate = `${year}-${month}-${day}`;
  return outputDate;
};

function ReportDate({ condition, id }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userID, setUserID] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  console.log(startDate);

  const startOnChange = (date) => {
    setStartDate(chnageDateFormat(new Date(date).toLocaleDateString()));
  };

  const endOnChange = (date) => {
    setEndDate(chnageDateFormat(new Date(date).toLocaleDateString()));
  };

  const handleDate = (e) => {
    e.preventDefault();

    if (condition === "alluser") {
      dispatch(
        fetchSlotAllUser(
          `slotegrator/users/reports?${
            startDate ? `start_date=${startDate}&` : ""
          }${endDate ? `end_date=${endDate}&` : ""}${
            userID ? `userId=${userID}` : ""
          }`
        )
      );
    } else {
      dispatch(
        fetchSlotUserDetail(
          `slotegrator/users/reports-detail?userId=${id}&${
            startDate ? `start_date=${startDate}&` : ""
          }${endDate ? `end_date=${endDate}&` : ""}${
            type ? `search=${type}` : ""
          }`
        )
      );
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
      ) : (
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
      )}
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
