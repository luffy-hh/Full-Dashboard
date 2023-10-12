import React, { useState } from "react";
import NormalButton from "../../../../Component/NormalButton";
import styles from "./GivetwoDZa.module.css";
import GivetwoTable from "./GivetwoTable";

function GivetwoDZa() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className={styles.give_two_section}>
      <h3>General Setting</h3>

      <div className={styles.give_two_container}>
        <div className={styles.give_two_box}>
          <p>နစ်လုံးထီအလျော်</p>
          <select
            className={styles.select_give_two}
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="Thai2Dmorning">Thai2Dmorning</option>
            <option value="Thai2Devening">Thai2Devening</option>
          </select>
          <input type="text" className={`input ${styles.give_two_amount}`} />
          <NormalButton className={styles.give_two_btn}>Save</NormalButton>
        </div>
      </div>
      <GivetwoTable />
      <div className={styles.give_two_footer}>
        <div>
          <p className={styles.min_max_bet}>Min Bet Amount</p>
          <input type="number" className={`${styles.give_two_footer_btn}`} />
          <NormalButton className={styles.give_two_btn}>Save</NormalButton>
        </div>
        <div>
          <p className={styles.min_max_bet}>Max Bet Amount</p>
          <input type="number" className={`${styles.give_two_footer_btn}`} />
          <NormalButton className={styles.give_two_btn}>Save</NormalButton>
        </div>
      </div>
    </div>
  );
}

export default GivetwoDZa;
