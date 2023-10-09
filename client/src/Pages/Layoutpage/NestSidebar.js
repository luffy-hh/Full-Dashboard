import React from "react";
import styles from "./Sidebar.module.css";
import { BsChevronDown } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import DoubleNav from "./DoubleNav";
import { useSelector, useDispatch } from "react-redux";
import { nestBool } from "../../Feactures/ShowHideSlice";
import { clicked } from "../../Feactures/ShowHideSlice";

function NestSidebar({ subNav }) {
  const showInter = useSelector(nestBool);
  const dispatch = useDispatch();

  return (
    <>
      {subNav.map((d) => (
        <li key={d.title}>
          <div className={styles.dropDownItem}>
            <span>{d.icon}</span>
            <span className={styles.sidebarTitle}>
              <NavLink to={d.route}>{d.title}</NavLink>
            </span>
            {d.iconRight ? (
              <span
                className={styles.rightArrow}
                onClick={() => dispatch(clicked())}
              >
                {showInter ? <BsChevronDown /> : d.iconRight}
              </span>
            ) : null}
          </div>
          {d.tribleNav ? (
            <DoubleNav showInter={showInter} tridata={d.tribleNav} />
          ) : null}
        </li>
      ))}
    </>
  );
}

export default NestSidebar;
