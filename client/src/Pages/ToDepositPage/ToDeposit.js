import React, { useEffect } from "react";
import ToDepositAndWithdrawForm from "../../Component/ToDepositAndWithdrawForm";
import { selectCurrentUserId, selectlogInData } from "../../Feactures/apiSlice";
import { AiFillNotification } from "react-icons/ai";
import {
  selectBankAnnounc,
  fetGetBankAnnounc,
  fetGetBankType,
  selectBankType,
  fetGetBankName,
  selectBankNameList,
  filterBankNameList,
  selectShowName,
  filterBankAccList,
  fetGetBankAcc,
  selectBankAccList,
  setShowName,
  setClickName,
  selectShowDepoForm,
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
  const bankType = useSelector(selectBankType);
  const bankNameList = useSelector(selectBankNameList);
  const isShow = useSelector(selectShowName);
  const bankAccList = useSelector(selectBankAccList);
  const showDepoForm = useSelector(selectShowDepoForm);

  useEffect(() => {
    dispatch(fetGetBankAnnounc({ api: "bankAnnounc", accessToken }));
    dispatch(fetGetBankType({ api: "banktype", accessToken }));
    dispatch(fetGetBankName({ api: "bankName", accessToken }));
    dispatch(fetGetBankAcc({ api: "bankAcc", accessToken }));
  }, []);

  const bankText = bankAnnounc?.data.bankAnnounc[0];
  const bankTypeArr = bankType?.data.allBankType;

  return (
    <div className="page_style" style={{ position: "relative" }}>
      {!showDepoForm ? (
        <div className={`box_shadow ${styles.account_head}`}>
          <p className={styles.account}>Account {currentUserId}</p>
          <p className={styles.system}>Payment System in your region</p>
          <div>
            <span style={{ fontSize: "2rem" }}>
              <AiFillNotification />{" "}
            </span>{" "}
            {bankText?.description_deposit}
          </div>
          <div>
            <AiFillNotification /> {bankText?.description_withdraw}
          </div>
          <Paymethod
            sideData={bankTypeArr}
            bankNameList={bankNameList}
            changeBank={filterBankNameList}
            isShow={isShow}
            changeAcc={filterBankAccList}
            bankAccList={bankAccList}
            setShowName={setShowName}
            setClickName={setClickName}
          />
        </div>
      ) : (
        <ToDepositAndWithdrawForm />
      )}
    </div>
  );
}

export default ToDeposit;
