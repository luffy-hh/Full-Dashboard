import React, { useEffect } from "react";
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

  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  useEffect(() => {
    dispatch(
      fetchGetAllUnitTransfer({ api: "mainunitstransfer", accessToken })
    );
  }, []);

  const unitTransferArr = getUnitTransfer?.data.mainUnitTransferHistory;

  const list = unitTransferArr?.map((d, i) => (
    <tr key={i} className={styles.transfer_tr_style}>
      <td>{i + 1}</td>
      <td>
        <span> {new Date(d.transferDate).toLocaleDateString()}</span>
        <span> {new Date(d.transferDate).toLocaleTimeString()}</span>
      </td>
      <td>{d.beforeUnitAmt}</td>
      <td style={{ color: d.status === "in" ? "#22c55e" : "#ef4444" }}>
        {d.transferAmt}
      </td>
      <td>{d.afterUnitAmt}</td>
      <td>{d.fromName}</td>
      <td>{d.toName}</td>
      <td>{d.description}</td>
    </tr>
  ));
  return (
    <>
      <UnitHistoryTransferCom list={list} />
    </>
  );
}

export default UnitHistoryTransfer;
