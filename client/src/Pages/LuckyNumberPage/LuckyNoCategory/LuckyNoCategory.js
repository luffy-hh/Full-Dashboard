import React from "react";
import { PiNumberCircleTwoDuotone } from "react-icons/pi";
import { PiNumberCircleThreeDuotone } from "react-icons/pi";
import styles from "./LuckyNoCategory.module.css";

function LuckyNoCategory({ show, setShow }) {
  return (
    <div className={styles.lucky_no_cate}>
      <ul>
        <li className="box_shadow" onClick={() => setShow(!show)}>
          <span className={styles.icons}>
            <PiNumberCircleTwoDuotone />
          </span>
          <span>Thai 2D morning</span>
        </li>
      </ul>
    </div>
  );
}

export default LuckyNoCategory;
