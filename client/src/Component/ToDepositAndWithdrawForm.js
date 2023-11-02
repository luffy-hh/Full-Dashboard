import React from "react";
import Button from "../Component/Button";
import { BiSolidImageAdd } from "react-icons/bi";
import styles from "./ToDepositWithdraw.module.css";
function ToDepositAndWithdrawForm() {
  return (
    <div className={`${styles.deop_with_form_container} box_shadow`}>
      <div className={styles.depo_with_bg}>
        <h3>Deposit Form</h3>
      </div>

      <form className={styles.depo_with_form}>
        <div>
          <label>To Current User</label>
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
          <label>Tax ID</label>
          <input type="text" />
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
