import React, { useEffect } from "react";
import { alreadyLogin, selectSetShowForm } from "../../Feactures/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Form";
import classes from "./Login.module.css";

function Login() {
  // useEffect(() => {
  //   const isAuthenticated = !!localStorage.getItem("token");

  //   if (isAuthenticated) {
  //     dispatch(alreadyLogin());
  //   }
  // }, [showForm]);

  return (
    <div className={classes.loginPage}>
      <div className={classes.loginDesign}>
        <Form />

        <div
          className={classes.loginBack}
          aria-label="background-photo"
          style={{ backgroundImage: 'url("img/login/login.jpg")' }}
        ></div>
      </div>
    </div>
  );
}

export default Login;
