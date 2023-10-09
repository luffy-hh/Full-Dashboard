import React from "react";
import Button from "../../../../Component/Button";
import styles from "./FirstTopNo.module.css";

function FirstTopNo() {
  return (
    <section className={styles.firt_top_no}>
      <h3>2D ထိပ်စီးပိတ်</h3>
      <p>2D ထိပ်စီးဖွင့်ထားသောဂဏန်း</p>
      <div className={styles.no_data}>There is No data</div>
      <div className={styles.first_no_footer}>
        <p>2D ထပ်စီးပိတ်ရန်</p>
        <form className={styles.first_no_form}>
          <input type="text" />
          <Button className={styles.first_no_btn}>Save</Button>
        </form>
      </div>
      <div className={styles.first_no_footer_text}>
        <p style={{ width: "10rem" }}>ထိပ်စီးများ</p>
        <p>
          မှတ်ချက်။ ထိပ်စီးသတ်မှတ်ပါကပတ်လည်ထိုးရမည်ဖြစ်မည်။
          သူသည်လည်းတစ်ပတ်လျှင်တစ်ကြိမ်သာအကြုံးဝင်မည်ဖြစ်မည်
        </p>
      </div>
    </section>
  );
}

export default FirstTopNo;

//
// You sent
//
// You sent
//
// You sent
//
// You sent
//
