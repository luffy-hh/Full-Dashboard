import React, { useEffect, useState } from "react";
import {
  selectGetUnitTransfer,
  fetchGetAllUnitTransfer,
  selectlogInData,
} from "../../Feactures/apiSlice";
import styles from "./UnitHistoryTransfer.module.css";

import { useSelector, useDispatch } from "react-redux";
import UnitHistoryTransferCom from "./UnitHistoryTransferCom";

function UnitHistoryTransfer() {
  const getUnitTransfer = useSelector(selectGetUnitTransfer);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState("");

  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const currentDate =
    new Date().getTime() -
    new Date().getHours() * 60 * 60 * 1000 -
    new Date().getMinutes() * 60 * 1000 -
    new Date().getSeconds() * 1000;

  useEffect(() => {
    dispatch(
      fetchGetAllUnitTransfer({
        api: `mainunitstransfer${
          selectedDate === "" || isNaN(selectedDate)
            ? "?transferDate[gte]=" + currentDate
            : "?transferDate[gte]=" + selectedDate
        }`,
        accessToken,
      })
    );
  }, [selectedDate]);

  const unitTransferArr = getUnitTransfer?.data.mainUnitTransferHistory;

  const list = unitTransferArr?.map((d, i) => (
    <tr key={i} className={styles.transfer_tr_style}>
      <td>{i + 1}</td>
      <td>
        <span> {new Date(d.transferDate).toLocaleDateString()}</span>
        <span> {new Date(d.transferDate).toLocaleTimeString()}</span>
      </td>
      <td>{d.beforeUnitAmt}</td>
      <td>
        <span
          className={styles.increase_decrease}
          style={{ backgroundColor: d.status === "in" ? "#22c55e" : "#ef4444" }}
        >
          {d.transferAmt}
        </span>
      </td>
      <td>{d.afterUnitAmt}</td>
      <td>{d.fromName}</td>
      <td>{d.toName}</td>
      <td>{d.description}</td>
    </tr>
  ));
  return (
    <>
      <UnitHistoryTransferCom list={list} setSelectedDate={setSelectedDate} />
    </>
  );
}

export default UnitHistoryTransfer;
