import React from 'react'
import styles from './ThaiTwoD12am.module.css';

function ThaiTwoDTable2() {
  return (
    <div className={styles.thai_table_2}>
        <p>2D</p>
        <ul className={styles.thai_no_table2}>
           <li>
             <span className={styles.thai_no_table_no}>00</span>
             <span className={styles.thai_no_table_amount}>19</span>
           </li>
           <li>
             <span className={styles.thai_no_table_no}>00</span>
             <span className={styles.thai_no_table_amount}>19</span>
           </li>
           <li>
             <span className={styles.thai_no_table_no}>00</span>
             <span className={styles.thai_no_table_amount}>19</span>
           </li>
           <li>
             <span className={styles.thai_no_table_no}>00</span>
             <span className={styles.thai_no_table_amount}>19</span>
           </li>
        </ul>
        <p className={styles.thai_no_table_total}>Total</p>
    </div>
  )
}

export default ThaiTwoDTable2