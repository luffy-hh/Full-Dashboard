import React from "react";
import styles from "./ThaiTwoD12am.module.css";

function ThaiTwoDTable2({ mainData, text }) {
  const list = mainData
    ?.sort((a, b) => a.number - b.number)
    .map((d) => (
      <li key={d.number}>
        <span className={styles.thai_no_table_no}>{d.number}</span>
        <span className={styles.thai_no_table_amount}>{d.count}</span>
      </li>
    ));

  const total = mainData?.reduce((acc, curr) => acc + curr.count, 0);
  return (
    <>
      {text === "Choose Category" ? (
        ""
      ) : (
        <div className={styles.thai_table_2}>
          <p>{text}</p>
          <ul className={styles.thai_no_table2}>{list}</ul>
          <p className={styles.thai_no_table_total}>Total {total}</p>
        </div>
      )}
    </>
  );
}

export default ThaiTwoDTable2;
