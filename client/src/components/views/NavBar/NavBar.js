import React from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import styles from "./NavBar.module.css";
import { CameraTwoTone } from "@ant-design/icons";

function NavBar() {
  return (
    <nav className={styles.navBar}>
      <div>
        <a href="/" className={styles.logo}>
          <CameraTwoTone twoToneColor="#722ed1" style={{ fontSize: "2rem" }} />
        </a>
      </div>
      <div className={styles.menuContainer}>
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_right">
          <RightMenu />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
