import React, { useEffect } from "react";
import {
  fetGetAgentUnitHistroy,
  selectAgentUnitHistory,
  selectlogInData,
} from "../../Feactures/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import UnitHistoryTransferCom from "./UnitHistoryTransferCom";
import styles from "./UnitHistoryTransfer.module.css";

function AgentUnitHistroy() {
  const agentUnitHistory = useSelector(selectAgentUnitHistory);
  const dispatch = useDispatch();

  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  useEffect(() => {
    dispatch(fetGetAgentUnitHistroy({ api: "transferTo", accessToken }));
  }, []);

  const unitTransferArr = agentUnitHistory?.data.transitionHistoryObj;

  const list = unitTransferArr?.map((d, i) => (
    <tr key={i} className={styles.transfer_tr_style}>
      <td>{i + 1}</td>
      <td>
        <span> {new Date(d.action_time).toLocaleDateString()}</span>
        <span> {new Date(d.action_time).toLocaleTimeString()}</span>
      </td>
      <td>{"No Data"}</td>
      <td style={{ color: "#ef4444" }}>{d.amount}</td>
      <td>{"No Data"}</td>
      <td>{d.fromId.name}</td>
      <td>{d.toId.name}</td>
      <td>{d.desc}</td>
    </tr>
  ));
  return (
    <>
      <UnitHistoryTransferCom list={list} />
    </>
  );
}

export default AgentUnitHistroy;
