import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { registerUser } from "../../../_actions/user_action";

import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onNameHandler = (event) => {
    setName(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 다릅니다.");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate("/log-in");
      } else {
        alert("failed to sign-up");
      }
    });
  };

  return (
    <div>
      <h1>회원가입 페이지</h1>
      <form className={styles.registerForm} onSubmit={onSubmitHandler}>
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          id="Email"
          onChange={onEmailHandler}
          value={Email}
        />
        <label htmlFor="Name">Name</label>
        <input type="text" id="Name" onChange={onNameHandler} value={Name} />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="Password"
          onChange={onPasswordHandler}
          value={Password}
        />
        <label htmlFor="confirmPassword">Checking Password</label>
        <input
          type="password"
          id="confirmPassword"
          onChange={onConfirmPasswordHandler}
          value={ConfirmPassword}
        />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
