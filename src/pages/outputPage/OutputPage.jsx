import React, { useState } from "react";
import styles from "./outputPage.module.css";
import { Link } from "react-router-dom";

import Qr from "../../components/qr/Qr";
import Loader from "../../components/loader/Loader";

import loader from "./../../assets/output/loader.svg";
import readyText from "./../../assets/output/readyText.svg";
import craftingYourTxt from "./../../assets/output/craftingYourTxt.svg";
import generatingText from "./../../assets/output/generatingText.svg";
import generateQrBtn from "./../../assets/output/generateQrBtn.svg";
import emailBtn from "./../../assets/output/emailBtn.svg";
import printBtn from "./../../assets/output/printBtn.svg";

export default function OutputPage({ generatedImg, url, setUrl }) {
  const [showQr, setShowQr] = useState(false);
  // generatedImg && console.log(generatedImg);
  return (
    <div className={styles.OutputPage}>
      <div
        className={generatedImg ? styles.headingImgOne : styles.headingImgTwo}
      >
        <img src={generatedImg ? readyText : craftingYourTxt} alt="image" />
      </div>

      {generatedImg ? (
        <div className={styles.generatedImgContainer}>
          <div className={styles.imgContainer}>
            <img src={generatedImg} alt="generated-image" />
          </div>
          <div className={styles.btnContainer}>
            {/* generate qr */}
            <div
              onClick={() => setShowQr(true)}
              className={`imgContainer ${styles.btn}`}
            >
              <img src={generateQrBtn} alt="generate-qr-button" />
            </div>

            {/* email */}
            <div
              onClick={() => setShowQr(true)}
              className={`imgContainer ${styles.btn}`}
            >
              <img src={emailBtn} alt="generate-qr-button" />
            </div>

            {/* print */}
            <div
              onClick={() => setShowQr(true)}
              className={`imgContainer ${styles.btn}`}
            >
              <img src={printBtn} alt="generate-qr-button" />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.loader}>
          {/* <img src={loader} alt="loader" /> */}
          <Loader />
        </div>
      )}

      {/* qr */}
      {showQr && <Qr url={url} setShowQr={setShowQr} />}
    </div>
  );
}
