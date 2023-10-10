import React from "react";
import Searchbar from "../../../../Component/Searchbar/Searchbar";
import DisableandEnable from "./DisableandEnable";
import {
  selectTwoDQuery,
  setTwoDQuery,
} from "../../../../Feactures/ShowHideSlice";
import { useSelector } from "react-redux";
import styles from "./OneClose.module.css";

function OneClose() {
  const twoDQuery = useSelector(selectTwoDQuery);
  return (
    <section className={styles.one_close_container}>
      <div className={styles.one_close_head}>
        <span className={styles.one_head_left}>သီးသန့်ပိတ်ဂဏန်း </span>
        <span>
          မှတ်ချက်။ သီးသန့်ပိတ်ဂဏန်းသည်တစ်ကြိမ်သာအကျုံးဝင်သည်
          ဥပမာမနက်ပိုင်းပိတ်ထားသည့်ဂဏန်းသည်ညနေအတွက်အကြုံးမဝင်ပါ
        </span>
      </div>
      <div className={styles.serach_bar_container}>
        <Searchbar query={twoDQuery} setQuery={setTwoDQuery} />
      </div>
      <DisableandEnable query={twoDQuery} />
    </section>
  );
}

export default OneClose;

//
