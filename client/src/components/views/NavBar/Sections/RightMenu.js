import React from "react";
import styles from "./RightMenu.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

function RightMenu() {
  const user = useSelector((state) => state.user);
  const logoutHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (!response.data.logoutSuccess) {
        alert("Log-out Failed");
      }
    });
    window.localStorage.removeItem("userId");
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <div>
        <a href="/log-in" className={styles.loginButton}>
          Log-in
        </a>
        <a href="/register" className={styles.registerButton}>
          Register
        </a>
      </div>
    );
  } else {
    return (
      <div>
        <a href="/video/upload" className={styles.videoButton}>
          Video
        </a>
        <a href="/" onClick={logoutHandler} className={styles.logoutButton}>
          Log-out
        </a>
      </div>
    );
  }
}

export default RightMenu;
