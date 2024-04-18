import React from "react";
import styles from "./genderPage.module.css";
import { useNavigate } from "react-router-dom";

import selectGenderTxt from "./../../assets/gender/selectGenderTxt.svg";
import maleBtn from "./../../assets/gender/maleBtn.svg";
import femaleBtn from "./../../assets/gender/femaleBtn.svg";

export default function GenderPage({ setGender }) {
  const navigate = useNavigate();

  return (
    <div className={`flex-col-center ${styles.GenderPage}`}>
      <div className={`imgContainer ${styles.selectGenderTxt}`}>
        <img src={selectGenderTxt} alt="select-gender-text" />
      </div>

      <div className={`flex-col-center ${styles.genderBtn}`}>
        <div
          onClick={() => {
            setGender("male");
            navigate("/camera");
          }}
          className={`imgContainer ${styles.femaleBtn}`}
        >
          <img src={maleBtn} alt="male" />
        </div>
        <div
          onClick={() => {
            setGender("female");
            navigate("/camera");
          }}
          className={`imgContainer ${styles.femaleBtn}`}
        >
          <img src={femaleBtn} alt="female" />
        </div>
      </div>
    </div>
  );
}
