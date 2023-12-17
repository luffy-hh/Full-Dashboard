import React from "react";
import styles from "./CreateShanForm.module.css";

function ShanPlayer({ players }) {
  const position = [
    { ver: "-2rem", hor: "43%" },
    { ver: "2rem", hor: "85%" },
    { ver: "20rem", hor: "79%" },
    { ver: "20rem", hor: "43%" },
    { ver: "18rem", hor: "0" },
    { var: "0", hor: 0 },
  ];

  const table = players?.map((d, i) => (
    <div
      className={styles.shan_player}
      style={{ top: position[i].ver, left: position[i].hor }}
      key={`shan_player${i}`}
    >
      <div className={styles.shan_player_name}>
        <img className={styles.profile} src="/img/Shan/Profile.png" />

        <span>{d.player_roll}</span>
      </div>
    </div>
  ));
  return <>{table}</>;
}

export default ShanPlayer;
