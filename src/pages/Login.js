import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./Login.module.css";
import { authActions } from "../store/auth-slice";


const Login = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hasAccountHandler = () => {
    setHasAccount((preState) => !preState);
  };

  let url;
  if (hasAccount) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHQkZc5kEJx6EpWTQ5jTQMX3UUkb3UJyA";
  } else {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHQkZc5kEJx6EpWTQ5jTQMX3UUkb3UJyA";
  }

  const loginFormHandler = async (event) => {
    event.preventDefault();

    if (
      !hasAccount &&
      passwordRef.current.value !== confirmPasswordRef.current.value
    ) {
      alert("Passwords does not match");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("idToken", JSON.stringify(data));
        dispatch(authActions.login());
        navigate('/home');
           console.log('user has succesfully signed up')
           
        
      } else {
        throw data.error;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={classes["main-form"]}>
      <form className={classes.form} onSubmit={loginFormHandler}>
        <div className={classes.title}>{hasAccount ? "Login" : "Sign Up"}</div>
        <input type="email" placeholder="Email" ref={emailRef} required />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        {!hasAccount && (
          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
            required
          />
        )}
        <div className={classes.button}>
          <button type="submit">{hasAccount ? "Log In" : "Sign Up"}</button>
        </div>
      </form>
      <div onClick={hasAccountHandler} className={classes.hasAccount}>
        {hasAccount
          ? "Don`t have an account? Sign Up"
          : "Have an account? Sign In"}
      </div>
    </div>
  );
};

export default Login;
