import React, { useState, useRef } from "react";
import styles from "./outputPage.module.css";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import Qr from "../../components/qr/Qr";
import Email from "../../components/email/Email";
import Loader from "../../components/loader/Loader";

import loader from "./../../assets/output/loader.svg";
import readyText from "./../../assets/output/readyText.svg";
import craftingYourTxt from "./../../assets/output/craftingYourTxt.svg";
import generatingText from "./../../assets/output/generatingText.svg";
import generateQrBtn from "./../../assets/output/generateQrBtn.svg";
import emailBtn from "./../../assets/output/emailBtn.svg";
import printBtn from "./../../assets/output/printBtn.svg";

export default function OutputPage({ generatedImg, url, setUrl }) {
  const printRef = useRef();
  const [showQr, setShowQr] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  // handle print
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

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
            <img ref={printRef} src={generatedImg} alt="generated-image" />
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
              onClick={() => setShowEmail(true)}
              className={`imgContainer ${styles.btn}`}
            >
              <img src={emailBtn} alt="generate-qr-button" />
            </div>

            {/* print */}
            <div onClick={handlePrint} className={`imgContainer ${styles.btn}`}>
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

      {/* email */}
      {showEmail && <Email setShowEmail={setShowEmail} url={url} />}
    </div>
  );
}
