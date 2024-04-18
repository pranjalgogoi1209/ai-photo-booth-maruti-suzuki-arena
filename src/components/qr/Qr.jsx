import React from "react";
import styles from "./qr.module.css";

import QRCode from "react-qr-code";
import { IoIosCloseCircle } from "react-icons/io";

import close from "./../../assets/close.svg";

export default function Qr({ url, setShowQr }) {
  // console.log("url =>", url);
  return (
    <div className={styles.Qr} onClick={() => setShowQr(false)}>
      <div
        className={styles.container}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <h2 className={`gothamBlack ${styles.heading}`}>SCAN, SAVE, SHARE !</h2>
        {!url && <span className="loader"></span>}
        {url && <QRCode size={150} value={url} className={styles.qrCode} />}

        {/* close */}
        <div className={styles.close} onClick={() => setShowQr(false)}>
          <img src={close} alt="close" />
        </div>
      </div>
    </div>
  );
}
