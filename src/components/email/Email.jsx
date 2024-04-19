import React, { useState, CSSProperties } from "react";
import styles from "./email.module.css";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import { SyncLoader } from "react-spinners";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import close from "./../../assets/close.svg";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import "react-simple-keyboard/build/css/index.css";
import Keyboard from "react-simple-keyboard";

export default function Email({ setShowEmail, url }) {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState();
  const [keyboardLayout, setKeyboardLayout] = useState("default");

  let [loading, setLoading] = useState(false);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  // toast options
  const toastOptions = {
    position: "top-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // send email to firebase
  /*  const sendEmail = async () => {
    // timestamp
    const timestamp = Date.now();

    const valueRef = collection(db, "inputVideos");
    const result = await addDoc(valueRef, {
      filename: filename,
      url: videoUrl,
      gender: gender,
      whatsappNumber: "",
      timestamp: timestamp,
      email: userEmail,
    });
  }; */

  // handle submit
  const handleSubmit = () => {
    if (!loading) {
      if (userEmail) {
        setLoading(true);
        sendEmail();
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 3000);
        toast.success("Email has sent successfully");
      } else {
        toast.error("Please enter a correct email");
      }
    } else {
      toast.error("Please wait...");
    }
  };

  const sendEmail = () => {
    try {
      axios
        .post(
          "https://adp24companyday.com/aiphotobooth/aiphotobooth_comiccon/emailer/index.php",
          {
            url: url,
            email: userEmail,
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      navigate("/output");
    } catch (error) {
      console.error("Error occurred during axios request:", error);
    }
  };

  const onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const handleShift = () => {
    const layoutName = "";

    keyboardLayout === "default"
      ? setKeyboardLayout("shift")
      : setKeyboardLayout("default");
  };

  const onChangeInput = event => {
    const input = event.target.value;

    setUserEmail(input);
  };

  return (
    <div className={styles.Email} onClick={() => setShowEmail(false)}>
      <div
        className={styles.container}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <input
          type="mail"
          value={userEmail}
          placeholder="Enter your email"
          onChange={e => setUserEmail(e.target.value)}
          className={styles.input}
        />
        <Keyboard
          keyboardRef={r => {
            if (window) window.keyboard = r;
          }}
          layoutName={keyboardLayout}
          onChange={input => {
            setUserEmail(input);
          }}
          onKeyPress={onKeyPress}
        />
        <button onClick={handleSubmit} className={styles.btn}>
          <ScaleLoader
            color={"#fff"}
            loading={loading}
            cssOverride={override}
            size={35}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          SUBMIT
        </button>

        <div className={styles.close} onClick={() => setShowEmail(false)}>
          <img src={close} alt="close" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
