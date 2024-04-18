import React, { useState, useRef } from "react";
import styles from "./cameraPage.module.css";
import { useNavigate, Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Webcam from "react-webcam";

import getClickedTxt from "./../../assets/camera/getClickedTxt.svg";
import doYouLikeTxt from "./../../assets/camera/doYouLikeTxt.svg";
import captureBtn from "./../../assets/camera/captureBtn.svg";
import retakeBtn from "./../../assets/camera/retakeBtn.svg";
import yesSubmitBtn from "./../../assets/camera/yesSubmitBtn.svg";

export default function CameraPage({ setCapturedImg }) {
  const webRef = useRef();
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const [isCaptured, setIsCaptured] = useState(false);

  // handle-capture
  const handleCapture = e => {
    if (webRef.current.getScreenshot()) {
      setIsCaptured(true);
      setImg(webRef.current.getScreenshot());
    }
  };

  // handle-retake
  const handleRetake = e => {
    setIsCaptured(false);
    img && setImg("");
  };

  // toast options
  const toastOptions = {
    position: "top-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // handle submit
  const handleSubmit = () => {
    // console.log("captured image submitting");
    if (img) {
      setCapturedImg(img);
      navigate("/avatar");
    } else {
      toast.error("Please capture your image", toastOptions);
    }
  };

  return (
    <div className={`flex-col-center ${styles.CameraPage}`}>
      <img
        src={isCaptured ? doYouLikeTxt : getClickedTxt}
        className={isCaptured ? styles.headingImg2 : styles.headingImg1}
      />

      <main className={styles.main}>
        <div className={styles.webcamParent}>
          <Webcam
            ref={webRef}
            id={styles.webcam}
            forceScreenshotSourceSize={true}
          />
          {img && (
            <img
              src={img}
              alt="captured image"
              className={styles.capturedImage}
            />
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        {isCaptured ? (
          <div className={styles.footer}>
            <div
              onClick={handleSubmit}
              className={`imgContainer ${styles.captureBtn}`}
            >
              <img src={yesSubmitBtn} alt="capture-button" />
            </div>

            <div
              onClick={e => handleRetake(e)}
              className={`imgContainer ${styles.captureBtn}`}
            >
              <img src={retakeBtn} alt="retake-button" />
            </div>
          </div>
        ) : (
          <div
            onClick={e => handleCapture(e)}
            className={`imgContainer ${styles.captureBtn}`}
          >
            <img src={captureBtn} alt="capture-button" />
          </div>
        )}
      </footer>
    </div>
  );
}
