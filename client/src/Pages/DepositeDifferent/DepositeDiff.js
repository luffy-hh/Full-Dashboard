import React from "react";
import NormalButton from "../../Component/NormalButton";
import styles from "../DepositeType/DepositeType.module.css";

function DepositeDiff() {
  return (
    <div className="page_style">
      <div className={`box_shadow ${styles.deposite_container}`}>
        <p>ငွေသွင်း/ထုတ်အမျိုးကွဲ</p>
        <NormalButton className={styles.deposite_create_btn}>
          Create
        </NormalButton>
      </div>
      <div className = "table_d_container">
      <table className="table_d box_shadow">
        <thead>
          <tr>
            <th style={{ width: "8rem" }}>စဥ်</th>
            <th>ငွေသွင်း/ထုတ်အမျိုးအစား</th>
            <th>ငွေသွင်း/ထုတ်အမျိုးကွဲ </th>

            <th style={{ minWidth: "15rem" }}>လိုဂို</th>
            <th>လုပ်ဆောင်ချက်</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.deposite_tr_style}>
            <td>1</td>
            <td>Online Payment</td>
            <td>Wave Pay</td>
            <td>Logo</td>
            <td
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2.4rem",
              }}
            >
              <NormalButton className={styles.deposite_edit_btn}>
                Edit
              </NormalButton>
              <NormalButton className={styles.deposite_delete_btn}>
                Delete
              </NormalButton>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default DepositeDiff;
