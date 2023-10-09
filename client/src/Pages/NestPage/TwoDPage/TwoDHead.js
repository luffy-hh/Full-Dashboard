import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTwoDHead,
  adminTwoDColor,
} from "../../../Feactures/adminTwodSlice";
import styles from "./TwoDPage.module.css";

function TwoDHead() {
  const twoDHead = useSelector(selectTwoDHead);
  const dispatch = useDispatch();
  const towDheadList = twoDHead.map((t) => (
    <li
      style={{ color: t.active ? "var(--blue)" : "" }}
      key={t.id}
      onClick={() => dispatch(adminTwoDColor({ id: t.id }))}
    >
      {t.text}
    </li>
  ));

  return (
    <div className={styles.two_d_head}>
      <ul>{towDheadList}</ul>
    </div>
  );
}

export default TwoDHead;
