import React, { useState } from "react";
import classes from "./Login.module.css";

const ADMINSIGN_URL =
  "https://admin-backend-udjq.onrender.com/api/v1/adminAcc/admin/signup";

function SignUp({ changePage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfrimPassword, setComfrimPassword] = useState("");
  const [error, setError] = useState(null);

  const data = { name, email, password, comfrimPassword };
  console.log(data);

  const signUpHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(ADMINSIGN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);

      // setFormshow(true);
      // setPostData(responseData);

      //show form
      if (responseData.stauts === "Success") {
        changePage();
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div className={classes.loginLogo}>
      <p>Welcome Back!</p>
      <form className={classes.loginFrom}>
        <input
          type="text"
          placeholder="Admin name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
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
        <input
          type="password"
          placeholder="Comfrim Password"
          value={comfrimPassword}
          onChange={(e) => setComfrimPassword(e.target.value)}
        />
        <button
          onClick={(e) => signUpHandle(e)}
          className={`btn ${classes.btnLogin}`}
        >
          Sign Up
        </button>
      </form>
      <div className={classes.horizontal_line}>
        <span className={classes.or_text}>or</span>
      </div>
      <p className={classes.text}>
        Already an account?
        <span className={classes.login} onClick={() => changePage()}>
          Login
        </span>
      </p>
    </div>
  );
}

export default SignUp;
