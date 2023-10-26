import React from "react";
import { Switch } from "antd";
import styles from "../CustomBox.module.css";

function UserDetailGameCat({ data }) {
  const list = data?.categoriesObjArr.map((d) => (
    <li
      key={d._id}
      className={`box_shadow ${styles.close_game} ${
        d.status ? "color_green" : "color_red"
      }`}
    >
      <span> {d.cat_name} </span>
      <Switch checked={d.status} onChange={() => closeGameHandle()} />
    </li>
  ));
  const closeGameHandle = () => {
    console.log("heeh");
  };
  return (
    <section className={styles.game_cat_container}>
      <h3>Game Category</h3>
      <ul>{list}</ul>
    </section>
  );
}

export default UserDetailGameCat;
