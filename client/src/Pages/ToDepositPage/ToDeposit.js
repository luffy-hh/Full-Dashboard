import React, { useEffect } from "react";
import ToDepositAndWithdrawForm from "../../Component/ToDepositAndWithdrawForm";
import { selectCurrentUserId, selectlogInData } from "../../Feactures/apiSlice";
import { AiFillNotification } from "react-icons/ai";
import {
  selectBankAnnounc,
  fetGetBankAnnounc,
  fetGetBankAccUpline,
  selectShowDepoForm,
  selectBankAccUpline,
} from "../../Feactures/bankApiSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ToDeposit.module.css";
import BankAccountList from "./BankAccountCom/BankAccountList";

function ToDeposit() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectCurrentUserId);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const bankAnnounc = useSelector(selectBankAnnounc);
  const bankAccUpline = useSelector(selectBankAccUpline);

  const showDepoForm = useSelector(selectShowDepoForm);

  useEffect(() => {
    dispatch(fetGetBankAnnounc({ api: "bankAnnounc", accessToken }));

    dispatch(fetGetBankAccUpline({ api: "backAccUpline", accessToken }));
  }, []);

  const bankText = bankAnnounc?.data.bankAnnounc[0];
  const bankAccUplineArr = bankAccUpline?.data.allBankAcc;

  return (
    <div className="page_style" style={{ position: "relative" }}>
      {!showDepoForm ? (
        <div className={`box_shadow ${styles.account_head}`}>
          <p className={styles.account}>AccountID {currentUserId}</p>
          <p className={styles.system}>Payment System in your region</p>
          <div className={styles.account_alret}>
            <div>
              <span style={{ fontSize: "2rem" }}>
                <AiFillNotification />{" "}
              </span>{" "}
              {bankText?.description_deposit}
            </div>
            <div>
              <AiFillNotification /> {bankText?.description_withdraw}
            </div>
          </div>

          <BankAccountList bankAccList={bankAccUplineArr} />
        </div>
      ) : (
        <ToDepositAndWithdrawForm />
      )}
    </div>
  );
}

export default ToDeposit;
