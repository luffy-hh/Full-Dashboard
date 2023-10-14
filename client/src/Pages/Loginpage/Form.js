import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import classes from "./Login.module.css";
import { fetchPostLogin, selectlogInStatus } from "../../Feactures/apiSlice";

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const logInStatus = useSelector(selectlogInStatus);

  const postData = { userId: email, password };

  const loginHandle = async (e) => {
    e.preventDefault();
    dispatch(fetchPostLogin({ api: "user/login", postData }));
  };

  return (
    <div className={classes.loginLogo}>
      <h1>Logo</h1>
      <p>Welcome Back!</p>
      <form className={classes.loginFrom} onSubmit={(e) => loginHandle(e)}>
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={logInStatus === "loading"}
          type="submit"
          className={`btn ${classes.btnLogin}`}
          // disabled={logInStatus === "loading"}
        >
          {logInStatus === "loading" ? "loading" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Form;
