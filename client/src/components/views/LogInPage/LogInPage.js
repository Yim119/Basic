import React from "react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { loginUser } from "../../../_actions/user_action";

import styles from "./LogInPage.module.css";

function LogInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/");
        localStorage.setItem("userId", response.payload.userId);
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <form className={styles.loginForm} onSubmit={onSubmitHandler}>
        <label htmlFor="email">E-Mail</label>
        <input
          id="email"
          type="email"
          value={Email}
          onChange={onEmailHandler}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        />
        <br />
        <button>Log-In</button>
      </form>
    </div>
  );
}

export default LogInPage;
