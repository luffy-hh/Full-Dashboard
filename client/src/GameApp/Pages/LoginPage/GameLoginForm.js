import React from "react";
import styles from "./GameForm.module.css";
import NormalButton from "../../../Component/NormalButton";

function GameLoginForm({ changeForm }) {
  return (
    <form
      style={{
        backgroundImage: "url(/img/login/LoginBox.png)",
        width: "60rem",
        height: "50rem",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "3.2rem",
        position: "absolute",
        top: "50%",
        transform: `translateY(-50%)`,
      }}
    >
      <div className={styles.game_form}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />
      </div>
      <div className={styles.game_form}>
        <label htmlFor="password">Pasword</label>
        <input id="password" type="email" />
      </div>
      <NormalButton className={styles.game_login_btn}>Log In</NormalButton>
      <p
        onClick={() => changeForm()}
        className={`${styles.alreaytext} ${styles.create}`}
      >
        Create a new user
      </p>
    </form>
  );
}

export default GameLoginForm;
