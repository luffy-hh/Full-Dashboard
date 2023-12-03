import React, { useEffect } from "react";
import { selectToWithdrawHeadRequset } from "../../Feactures/AllUserPageSlice";
import NormalButton from "../../Component/NormalButton";
import {
  fetPatchWithDraw,
  selectPatchWithdrawStatus,
  selectPatchWithdraw,
} from "../../Feactures/bankApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectlogInData } from "../../Feactures/apiSlice";
import Tables from "../../Component/Tables";
import styles from "./ToDepositHistory.module.css";

function ToWithdrawRequests({ api, editApi, getUpLineFun, upLineData }) {
  const todepositeHead = useSelector(selectToWithdrawHeadRequset);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  // const patchWithdrawStatus = useSelector(selectPatchWithdrawStatus);

  const patchWithdraw = useSelector(selectPatchWithdraw);

  const dispatch = useDispatch();
  const withDrawUpLine = useSelector(upLineData);

  useEffect(() => {
    dispatch(getUpLineFun({ api: api, accessToken })); //withdarwUpline
  }, [patchWithdraw]);

  const withDrawArr = withDrawUpLine?.data.getAllShwoWithdraw;
  console.log(withDrawArr && withDrawArr);

  const handleAccept = (id, amount) => {
    dispatch(
      fetPatchWithDraw({
        api: `${editApi}/${id}`, //withdarwAdmin is for admin comfirm btn
        patchData: { status: "Confirm", unit: amount },
        accessToken,
      })
    );
    console.log("working");
  };

  const handleCancel = (id, amount) => {
    dispatch(
      fetPatchWithDraw({
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
          <td>{d?.bankNameId?.bankName}</td>
          <td>{d.recAccName}</td>
          <td>{d.recAcc}</td>

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
    <div className="page_style" style={{ overflow: "hidden" }}>
      <div className={`box_shadow ${styles.deposit_title}`}>
        To Withdraw Request
      </div>
      <div className={`hide_scroll ${styles.depo_with_history}`}>
        <Tables thead={todepositeHead} tbody={tbodyList} />
      </div>
    </div>
  );
}

export default ToWithdrawRequests;
