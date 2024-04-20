import React, { useEffect, useState } from "react";
import styles from "./avatarPage.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

import { maleCardsArr } from "./../../utils/avatar/cards";
import { femaleCardsArr } from "./../../utils/avatar/cards";
import { maleOriginalImagesArr } from "../../utils/avatar/originalImages";
import { femaleOriginalImagesArr } from "../../utils/avatar/originalImages";
import { base64 } from "../../utils/base64";

import select from "./../../assets/avatar/select.svg";
import pickYourTxt from "./../../assets/avatar/pickYourTxt.svg";
import selectBtn from "./../../assets/avatar/selectBtn.svg";

export default function AvatarPage({
  setGeneratedImg,
  capturedImg,
  setUrl,
  gender,
}) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState();
  const [originalImg, setOriginalImg] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState();
  const [cards, setCards] = useState();

  gender &&
    useEffect(() => {
      if (gender.toLowerCase() === "female") {
        setCards(femaleCardsArr);
      } else if (gender.toLowerCase() === "male") {
        setCards(maleCardsArr);
      }
    }, [gender]);

  // toast options
  const toastOptions = {
    position: "top-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // filtering card image with actual image
  const filterOriginalImg = index => {
    if (gender.toLowerCase() === "female") {
      console.log("female hai");
      const filteredActualImgArr = femaleOriginalImagesArr.filter(
        (actualImg, ActualIndex) => ActualIndex === index
      );
      return filteredActualImgArr[0];
    } else if (gender.toLowerCase() === "male") {
      console.log("male hai");
      const filteredActualImgArr = maleOriginalImagesArr.filter(
        (actualImg, ActualIndex) => ActualIndex === index
      );
      return filteredActualImgArr[0];
    }
  };

  // image uploading on server
  const getUrl = url => {
    axios
      .post(
        "https://adp24companyday.com/aiphotobooth/aiphotobooth_comiccon/upload.php",
        {
          img: url,
        }
      )
      .then(function (response) {
        setUrl(response.data.url);
        // console.log("image uploaded on server");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // submitting the selected image and post request to api
  const handleSubmit = () => {
    // console.log("submitting selected avatar");

    setGeneratedImg("");
    if (capturedImg) {
      base64(originalImg, base64Data => {
        // console.log("Base64 data:", base64Data);
        setSelectedImage(base64Data);

        try {
          axios
            .post("https://h.ngrok.dev/rec", {
              image: capturedImg.split(",")[1],
              choice: base64Data.split(",")[1],
            })
            .then(function (response) {
              console.log(response);
              setGeneratedImg(`data:image/webp;base64,${response.data.result}`);

              // image uploading on server
              getUrl(response.data.result);
            })
            .catch(function (error) {
              console.log(error);
            });
          navigate("/output");
        } catch (error) {
          console.error("Error occurred during axios request:", error);
        }
      });
    } else {
      toast.error(
        "Please select an image or capture your photo again...",
        toastOptions
      );
    }
  };

  return (
    <div className={`flex-col-center ${styles.AvatarPage}`}>
      <div className={`imgContainer ${styles.avatarText}`}>
        <img src={pickYourTxt} alt="pick-your-character-text" />
      </div>

      <main className={styles.main}>
        {cards?.map((img, index) => (
          <div
            key={index}
            className={styles.singleImageContainer}
            onClick={() => {
              setSelectedImageIndex(index);
              /* setSelectedImage(filterOriginalImg(index)); */
              const originalImg = filterOriginalImg(index);
              setOriginalImg(originalImg);
            }}
          >
            <div className={styles.parent}>
              <div className={styles.imgContainer}>
                <img src={img} alt="avatar" />
              </div>

              <div
                className={`${styles.hoverContainer} ${
                  selectedImageIndex === index ? styles.showHoverContainer : ""
                }`}
              >
                <div className={`${styles.selectIcon}`}>
                  <img src={select} alt="selected" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer onClick={handleSubmit} className={styles.footer}>
        <div className={`imgContainer ${styles.selectBtn}`}>
          <img src={selectBtn} alt="select-button" />
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
}
