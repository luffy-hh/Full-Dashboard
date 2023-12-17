import React from "react";

import styles from "./GameNavandFooter.module.css";

const data = [
  { id: 1, logo: "/img/Nav/MenuButtomW.png" },
  { id: 2, logo: "/img/Nav/BackButtomW.png" },
  { id: 3, logo: "/img/Nav/SettinButtomW.png" },
  { id: 4, logo: "/img/Nav/TransationButtomW.png" },
];

function GameNavbar() {
  const menuList = data.map((c) => (
    <li key={c.id}>
      <button className={styles.menu_btn}>
        <img src={c.logo} alt="menu_logo" />
      </button>
    </li>
  ));
  return (
    <nav style={{ backgroundImage: `url(/img/Nav/TopBar.jpg)` }}>
      <ul className={styles.menu_container}>{menuList}</ul>

      <img
        className={styles.level_photo}
        src="/img/Nav/VipOne.png"
        alt="level-phot"
      />

      <div className={styles.menu_box_container}>
        <div className={styles.menu_box}>
          <img src="/img/Nav/Person.png" alt="people_icon" />
          <span>Loading...</span>
        </div>
        <div className={styles.menu_box}>
          <img src="/img/Nav/Coin.png" alt="people_icon" />
          <span>Loading...</span>
        </div>
      </div>

      <img className={styles.logo_main} src="/img/Nav/logoPg.jpg" alt="logo" />
    </nav>
  );
}

export default GameNavbar;
