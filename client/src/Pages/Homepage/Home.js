import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.homePage}>
      <h3>My admin</h3>
    </div>
  );
}

export default Home;
