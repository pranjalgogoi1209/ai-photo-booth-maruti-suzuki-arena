import React, { useEffect, useState } from "react";
import styles from "./homePage.module.css";

import { Link } from "react-router-dom";

import headingTxt from "./../../assets/home/headingTxt.svg";
import startBtn from "./../../assets/home/startBtn.svg";
import logo from "./../../assets/logo.png";

export default function HomePage() {
  return (
    <div className={`flex-col-center ${styles.HomePage}`}>
      <div className={styles.containerOne}>
        <img src={logo} alt="garnier-logo" />
      </div>

      <div className={styles.headingTxt}>
        <img src={headingTxt} alt="heading-txt" />
      </div>

      <Link to={"/gender"} className={styles.startBtn}>
        <div className={`imgContainer ${styles.imgContainer}`}>
          <img src={startBtn} alt="start-button" />
        </div>
      </Link>
    </div>
  );
}
