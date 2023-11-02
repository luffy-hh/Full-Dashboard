import React, { useEffect } from "react";
import ToDepositAndWithdrawForm from "../../Component/ToDepositAndWithdrawForm";
import { selectCurrentUserId, selectlogInData } from "../../Feactures/apiSlice";
import { AiFillNotification } from "react-icons/ai";
import {
  selectBankAnnounc,
  fetGetBankAnnounc,
} from "../../Feactures/bankApiSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ToDeposit.module.css";
import Paymethod from "./PayMehtod/Paymethod";

function ToDeposit() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectCurrentUserId);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const bankAnnounc = useSelector(selectBankAnnounc);

  useEffect(() => {
    dispatch(fetGetBankAnnounc({ api: "bankAnnounc", accessToken }));
  }, []);

  const bankText = bankAnnounc?.data.bankAnnounc[0];
  console.log(bankText);

  return (
    <div className="page_style" style={{ position: "relative" }}>
      <div className={`box_shadow ${styles.account_head}`}>
        <p className={styles.account}>Account {currentUserId}</p>
        <p className={styles.system}>Payment System in your region</p>
        <div>
          <AiFillNotification /> {bankText?.description_deposit}
        </div>
        <div>
          <AiFillNotification /> {bankText?.description_withdraw}
        </div>
        <Paymethod />
      </div>
    </div>
  );
}

export default ToDeposit;
