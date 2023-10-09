import React, { useState } from "react";
import styles from "./GameForm.module.css";
import Container from "../../../Component/Container";
import GameSignUp from "./GameSignUp";
import GameLoginForm from "./GameLoginForm";

function GameUserLogin() {
  const [showSignup, setShowSignup] = useState(true);

  const changeForm = () => {
    setShowSignup(!showSignup);
  };
  return (
    <Container className={styles.game_form_page}>
      <div
        style={{
          backgroundImage: "url(/img/login/LoginBackground.png)",
          width: "100%",
          height: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        {showSignup ? (
          <GameSignUp changeForm={changeForm} />
        ) : (
          <GameLoginForm changeForm={changeForm} />
        )}
      </div>
    </Container>
  );
}

export default GameUserLogin;
