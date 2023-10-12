import React from "react";
import NormalButton from "../../Component/NormalButton";
import styles from "./DepositeType.module.css";

function DepositeType() {
  return (
    <div className="page_style">
      <div className={`box_shadow ${styles.deposite_container}`}>
        <p>Deposite Type</p>
        <NormalButton className={styles.deposite_create_btn}>
          Create
        </NormalButton>
      </div>

      <div className = "table_d_container">
        <table className="table_d box_shadow">
          <thead>
            <tr>
              <th>စဥ်</th>
              <th>ငွေသွင်း/ထုတ်အမျိုးအစား</th>
              <th>လုပ်ဆောင်ချက်</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.deposite_tr_style}>
              <td>1</td>
              <td>Online Payment</td>
              <td>
                <NormalButton className={styles.deposite_edit_btn}>
                  Edit
                </NormalButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DepositeType;
