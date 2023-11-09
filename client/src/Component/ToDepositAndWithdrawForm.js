import React, { useState } from "react";
import Button from "../Component/Button";
import {
  selectBankNameId,
  fetPostDeposit,
  selectPostDepositStatus,
  setShowDepoForm,
} from "../Feactures/bankApiSlice";
import { selectlogInData } from "../Feactures/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ToDepositWithdraw.module.css";
import CancelHot from "../GameApp/Comoponent/HotNumber/CancelHot";
function ToDepositAndWithdrawForm() {
  const [amount, setAmount] = useState("");
  const [tax, setTax] = useState("");
  const [fromAcc, setFromAcc] = useState("");
  const [accountTo, setAccountTo] = useState("");
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const postDepositStatus = useSelector(selectPostDepositStatus);
  const bankNameId = useSelector(selectBankNameId); //auto select from account

  const dispatch = useDispatch();
  console.log("testingbankId", bankNameId);
  const postData = {
    bankName_id: bankNameId,
    amount: Number(amount),
    transferCode: Number(tax),
    fromAcc: fromAcc,
    toAcc: accountTo,
  };

  console.log(postData);

  const handlePost = (e) => {
    e.preventDefault();
    dispatch(fetPostDeposit({ api: "deposit", postData, accessToken }));

    if (postDepositStatus === "succeeded") {
      console.log("hello");
      setAmount("");
      setTax("");
      setFromAcc("");
      setAccountTo("");
    }
  };
  return (
    <>
      <CancelHot hideFun={setShowDepoForm} top={"1"} right={"7"} />

      <div className={`${styles.deop_with_form_container} box_shadow`}>
        <div className={styles.depo_with_bg}>
          <h3>Deposit Form</h3>
        </div>

        <form className={styles.depo_with_form} onSubmit={(e) => handlePost(e)}>
          <div>
            <label>From Account</label>
            <input
              type="text"
              value={fromAcc}
              onChange={(e) => setFromAcc(e.target.value)}
            />
          </div>
          <div>
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label>Account To</label>
            <input
              type="text"
              value={accountTo}
              onChange={(e) => setAccountTo(e.target.value)}
            />
          </div>
          <div>
            <label>Tax ID</label>
            <input
              type="text"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
            />
          </div>

          <div className={styles.dep_with_btn}>
            <Button className="btn_hover">
              {postDepositStatus === "loading" ? "Loading" : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ToDepositAndWithdrawForm;
