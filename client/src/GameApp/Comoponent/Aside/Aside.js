import React from "react";
import { NavLink } from "react-router-dom";
import { asideData, changeBtnImg } from "../../../Feactures/StaticDataSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Aside.module.css";

function Aside() {
  const data = useSelector(asideData);
  const dispatch = useDispatch();

  const asideList = data.map((a) => (
    <li key={a.id} onClick={(e) => dispatch(changeBtnImg({ id: a.id }))}>
      <NavLink to={a.route}>
        <img
          className={styles.aside_btn}
          src={a.active ? a.img[1] : a.img[0]}
          alt="img_button"
        />
      </NavLink>
    </li>
  ));

  return (
    <aside className={styles.aside_contianer}>
      <ul className={styles.aside_list}>{asideList}</ul>
    </aside>
  );
}

export default Aside;
