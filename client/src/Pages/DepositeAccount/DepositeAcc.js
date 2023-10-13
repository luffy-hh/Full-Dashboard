import React from "react";
import NormalButton from "../../Component/NormalButton";
import styles from "../DepositeType/DepositeType.module.css";

function DepositeAcc() {
  return (
    <div className={`page_style ${styles.deposite_page}`}>
      <div className={`box_shadow ${styles.deposite_container}`}>
        <p>Deposite Account</p>
        <NormalButton className={styles.deposite_create_btn}>
          Create
        </NormalButton>
      </div>
      <div className={`hide_scroll ${styles.depositeAcc_table_container}`}>
        <table className={`${styles.table_d_acc} box_shadow`}>
          <thead>
            <tr>
              <th style={{ minWidth: "8rem" }}>စဥ်</th>
              <th style={{ minWidth: "20rem" }}>ငွေသွင်း/ထုတ်အမျိုးအစား</th>
              <th style={{ minWidth: "20rem" }}>ငွေသွင်း/ထုတ်အမျိုးကွဲ </th>

              <th style={{ minWidth: "20rem" }}>လိုဂို</th>
              <th style={{ minWidth: "20rem" }}>Account No</th>
              <th style={{ minWidth: "20rem" }}>Account Name</th>
              <th style={{ minWidth: "25rem" }}>လုပ်ဆောင်ချက်</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.deposite_tr_style}>
              <td>1</td>
              <td>Online Payment</td>
              <td>Wave Pay</td>
              <td>Logo</td>
              <td>122222</td>
              <td>Thu Thu</td>
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

export default DepositeAcc;