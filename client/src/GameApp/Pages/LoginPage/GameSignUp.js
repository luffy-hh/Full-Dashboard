import React from "react";
import NormalButton from "../../../Component/NormalButton";
import styles from "./GameForm.module.css";

function GameSignUp({ changeForm, setShowForm }) {
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
      <NormalButton
        className={styles.game_login_btn}
        onClick={() => setShowForm(true)}
      >
        Sign Up
      </NormalButton>
      <p className={styles.alreaytext}>
        Already Register?{" "}
        <span onClick={() => changeForm()} className={styles.logintext}>
          Login
        </span>
      </p>
    </form>
  );
}

export default GameSignUp;
