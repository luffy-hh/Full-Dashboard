import React from "react";
import DisableandEnable from "./DisableandEnable";
import styles from "./OneClose.module.css";

function OneClose() {
  return (
    <section className={styles.one_close_container}>
      <div className={styles.one_close_head}>
        <span className={styles.one_head_left}>သီးသန့်ပိတ်ဂဏန်း </span>
        <span>
          မှတ်ချက်။ သီးသန့်ပိတ်ဂဏန်းသည်တစ်ကြိမ်သာအကျုံးဝင်သည်
          ဥပမာမနက်ပိုင်းပိတ်ထားသည့်ဂဏန်းသည်ညနေအတွက်အကြုံးမဝင်ပါ
        </span>
      </div>
      <DisableandEnable />
    </section>
  );
}

export default OneClose;

//
