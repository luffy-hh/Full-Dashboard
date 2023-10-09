import React from "react";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

function DoubleNav({ showInter, tridata }) {
  return (
    <ul
      className={`${showInter ? styles.dropDownOpen : styles.dropDownHide} ${
        styles.doubleNav
      }`}
    >
      {tridata.map((data) => (
        <li key={data.route}>
          <NavLink to={data.route}>{data.title}</NavLink>
        </li>
      ))}
    </ul>
  );
}

export default DoubleNav;
