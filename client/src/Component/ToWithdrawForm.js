import React from "react";

import Button from "../Component/Button";
import { BiSolidImageAdd } from "react-icons/bi";
import styles from "./ToDepositWithdraw.module.css";

function ToWithdrawForm() {
  return (
    <div className={`${styles.deop_with_form_container} box_shadow`}>
      <div className={styles.depo_with_bg}>
        <h3>Withdraw Form</h3>
      </div>

      <form className={styles.depo_with_form}>
        <div>
          <label>To Upline Agent</label>
          <input type="text" />
        </div>
        <div>
          <label>Amount</label>
          <input type="number" />
        </div>
        <div>
          <label>Select Banking Type</label>
          <select>
            <option value="">Choose Bank Type</option>
          </select>
        </div>
        <div>
          <label>Select Payment Type </label>
          <select>
            <option value="">Choose Payment Type</option>
          </select>
        </div>
        <div>
          <label>Account To</label>
          <input type="text" />
        </div>
        <div>
          <label>Account Name</label>
          <input type="text" />
        </div>

        <div className={styles.dep_with_btn}>
          <Button className="btn_hover">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default ToWithdrawForm;
