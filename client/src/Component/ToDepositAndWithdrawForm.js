import React, { useState } from "react";
import Button from "../Component/Button";
import { BiSolidImageAdd } from "react-icons/bi";
import {
  selectClickName,
  selectClickBankAcc,
  selectClickBankNameId,
  fetPostDeposit,
  selectPostDepositStatus,
} from "../Feactures/bankApiSlice";
import { selectlogInData } from "../Feactures/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ToDepositWithdraw.module.css";
function ToDepositAndWithdrawForm() {
  const [amount, setAmount] = useState(null);
  const [tax, setTax] = useState(null);
  const clickName = useSelector(selectClickName);
  const clickBankAcc = useSelector(selectClickBankAcc);
  const clickBankNameId = useSelector(selectClickBankNameId);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const postDepositStatus = useSelector(selectPostDepositStatus);
  const dispatch = useDispatch();

  const postData = {
    bankName_id: clickBankNameId,
    bankAcc: clickName,
    transferCode: tax,
    amount: Number(amount),
  };

  const handlePost = (e) => {
    e.preventDefault();
    dispatch(fetPostDeposit({ api: "deposit", postData, accessToken }));

    if (postDepositStatus === "succeeded") {
      setAmount("");
      setTax("");
    }
  };
  return (
    <div className={`${styles.deop_with_form_container} box_shadow`}>
      <div className={styles.depo_with_bg}>
        <h3>Deposit Form</h3>
      </div>

      <form className={styles.depo_with_form} onSubmit={(e) => handlePost(e)}>
        <div>
          <label>To Current User</label>
          <input type="text" />
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
          <label>Select Banking Type</label>
          <p>{clickBankAcc}</p>
        </div>
        <div>
          <label>Select Payment Type </label>
          <p>{clickName}</p>
        </div>
        <div>
          <label>Account To</label>
          <input type="text" />
        </div>
        <div>
          <label>Tax ID</label>
          <input
            type="text"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
          />
        </div>
        <div className={styles.input_file}>
          <span>Transition History ScreenShot</span>
          <label htmlFor="img">
            <BiSolidImageAdd />
          </label>
          <input id="img" type="file" />
        </div>
        <div className={styles.dep_with_btn}>
          <Button className="btn_hover">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default ToDepositAndWithdrawForm;
