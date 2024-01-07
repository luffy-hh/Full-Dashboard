import React, { useEffect } from "react";
import { selectToDepositHeadReq } from "../../Feactures/AllUserPageSlice";
import NormalButton from "../../Component/NormalButton";
import {
  fetPatchDeposit,
  selectPatchWithdrawStatus,
  selectPatchDeposit,
} from "../../Feactures/bankApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectlogInData } from "../../Feactures/apiSlice";
import Tables from "../../Component/Tables";
import styles from "./ToDepositHistory.module.css";
import { selectCollapsed } from "../../Feactures/modalSlice";

function ToDepositRequest({ api, editApi, getUpLineFun, upLineData }) {
  const todepositeHead = useSelector(selectToDepositHeadReq);

  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  // const patchWithdrawStatus = useSelector(selectPatchWithdrawStatus);

  const patchDeposit = useSelector(selectPatchDeposit);
  const collapsed = useSelector(selectCollapsed);

  const dispatch = useDispatch();
  const withDrawUpLine = useSelector(upLineData);

  useEffect(() => {
    dispatch(getUpLineFun({ api: api, accessToken })); //withdarwUpline
  }, [patchDeposit]);

  const withDrawArr = withDrawUpLine?.data.allDepositUpline;
  console.log(withDrawArr && withDrawArr);

  const handleAccept = (id, amount) => {
    dispatch(
      fetPatchDeposit({
        api: `${editApi}/${id}`, //withdarwAdmin is for admin comfirm btn
        patchData: { status: "Confirm", unit: amount },
        accessToken,
      })
    );
    console.log("working");
  };

  const handleCancel = (id, amount) => {
    dispatch(
      fetPatchDeposit({
        api: `${editApi}/${id}`, //withdarwAdmin is for admin comfirm btn
        patchData: { status: "Cancle", unit: amount },
        accessToken,
      })
    );
    console.log("working");
  };

  const tbodyList = withDrawArr?.map((d, i) => (
    <>
      {d.status === "Panding" && (
        <tr
          key={`withdraw_${i}`}
          style={{
            borderBottom: "1px solid #a8a29e",
          }}
          className="table_d_tbody_tr"
        >
          <td>{i + 1}</td>
          <td>{d.amount}</td>

          <td>{d.fromId.userId} </td>
          <td>{d?.bankName_id?.bankName}</td>
          <td>{d.toId.name}</td>
          <td>{d.toId.userId}</td>
          <td>{d.transferCode}</td>
          <td>{d.fromAcc}</td>

          <td>{d.status}</td>
          <td className={styles.action}>
            <NormalButton
              className={`${styles.acc_btn} `}
              onClick={() => handleAccept(d._id, d.amount)}
            >
              Confirm
            </NormalButton>
            <NormalButton
              onClick={() => handleCancel(d._id, d.amount)}
              className={`${styles.rej_btn} `}
            >
              Cancle
            </NormalButton>
          </td>

          <td className={styles.date_style}>
            <span style={{ marginRight: "1.2rem" }}>
              {new Date(d.action_time).toLocaleDateString()}
            </span>
            <span>{new Date(d.action_time).toLocaleTimeString()}</span>
          </td>
        </tr>
      )}
    </>
  ));

  return (
    <div
      className={collapsed ? "page_style_coll" : "page_style"}
      style={{ overflow: "hidden" }}
    >
      <div className={`box_shadow ${styles.deposit_title}`}>
        To Deosit Request
      </div>
      <div className={`hide_scroll ${styles.depo_with_history}`}>
        <Tables thead={todepositeHead} tbody={tbodyList} />
      </div>
    </div>
  );
}

export default ToDepositRequest;
