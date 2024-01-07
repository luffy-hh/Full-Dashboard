import React, { useEffect, useState } from "react";
import { selectToWithdrawHead } from "../../Feactures/AllUserPageSlice";

// import { selectWithdraw, fetGetwithdraw } from "../../Feactures/bankApiSlice";
import { selectUpLineOrDownLine } from "../../Feactures/AllUserPageSlice";
import { setShowDropDown } from "../../Feactures/ShowHideSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectlogInData } from "../../Feactures/apiSlice";
import Tables from "../../Component/Tables";
import styles from "./ToDepositHistory.module.css";
import Dropdown from "../../Component/Dropdown/Dropdown";
import { selectCollapsed } from "../../Feactures/modalSlice";

function ToWithdrawHistory({
  api,
  history,
  withDrawFun,
  uplineOrDownLine,
  downApi,
  downFun,
}) {
  const todepositeHead = useSelector(selectToWithdrawHead);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const role = logInData.user.role;
  const dispatch = useDispatch();
  const [isUpline, setUpLine] = useState(uplineOrDownLine);
  const [selectName, setSelectName] = useState("From UpLine");
  const collapsed = useSelector(selectCollapsed);

  const withDrawHistory = useSelector(history);

  const upLineOrDownLineData = useSelector(selectUpLineOrDownLine);

  const handleDrop = (name, text) => {
    setUpLine(name);
    dispatch(setShowDropDown());
    setSelectName(text);
  };

  const list = upLineOrDownLineData.map((d) => (
    <li onClick={() => handleDrop(d.text, d.from)} key={d.id}>
      {d.from}
    </li>
  ));

  useEffect(() => {
    if (isUpline === "UpLine") {
      dispatch(withDrawFun({ api: api, accessToken }));
      console.log("upLineWorking");
    } else {
      dispatch(downFun({ api: downApi, accessToken }));
      console.log("downLIne Woring");
    }
    //downline is for master //upline is for admin for history
  }, [isUpline]);

  const withDrawArrHistsory = withDrawHistory?.data.getAllShwoWithdraw;

  const tbodyList = withDrawArrHistsory?.map((d, i) => (
    <tr
      key={d._id}
      style={{
        borderBottom: "1px solid #a8a29e",
        backgroundColor:
          d.status === "Confirm"
            ? "#bbf7d0"
            : d.status === "Cancle"
            ? "#fecaca"
            : d.status === "Panding"
            ? "#f5f5f4"
            : "#f5f5f4",
      }}
      className="table_d_tbody_tr"
    >
      <td>{i + 1}</td>
      <td>{d.amount}</td>

      <td>{d.fromId.userId} </td>
      <td>{d.bankNameId.bankName}</td>
      <td>{d.recAccName}</td>
      <td>{d.recAcc}</td>

      <td>{d.status}</td>

      <td className={styles.date_style}>
        <span style={{ marginRight: "1.2rem" }}>
          {new Date(d.action_time).toLocaleDateString()}
        </span>
        <span>{new Date(d.action_time).toLocaleTimeString()}</span>
      </td>
    </tr>
  ));

  return (
    <div
      className={collapsed ? "page_style_coll" : "page_style"}
      style={{ overflow: "hidden" }}
    >
      <div className={`box_shadow ${styles.deposit_title}`}>
        <p>To Withdraw History</p>
        {role === "Admin" ? (
          ""
        ) : (
          <Dropdown width={"30rem"} title={selectName} list={list} />
        )}
      </div>
      <div className={`hide_scroll ${styles.depo_with_history}`}>
        <Tables thead={todepositeHead} tbody={tbodyList} />
      </div>
    </div>
  );
}

export default ToWithdrawHistory;
