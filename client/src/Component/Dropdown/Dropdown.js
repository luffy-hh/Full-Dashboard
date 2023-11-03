import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowDropDown,
  selectShowDropDown,
} from "../../Feactures/ShowHideSlice";
import styles from "./Dropdown.module.css";

function Dropdown({ width, title, list }) {
  const showDropDown = useSelector(selectShowDropDown);
  const dispatch = useDispatch();
  return (
    <section className={styles.dropdown_container} style={{ width: width }}>
      <div className={styles.dropdown}>
        <span>{title}</span>
        <span
          className={styles.dropdown_icon}
          onClick={() => dispatch(setShowDropDown())}
        >
          <AiFillCaretDown />
        </span>
      </div>
      {showDropDown && <ul>{list}</ul>}
    </section>
  );
}

export default Dropdown;
