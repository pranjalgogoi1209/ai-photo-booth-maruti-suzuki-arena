import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import logo from "./../../assets/logo.png";

export default function Header() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    // console.log(location.pathname);
    if (location.pathname === "/") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return (
    showNavbar && (
      <div className={`flex-row-center ${styles.Header}`}>
        {showNavbar && (
          <Link to={"/"}>
            <div className={`imgContainer ${styles.imgContainer}`}>
              <img src={logo} alt="logo" />
            </div>
          </Link>
        )}
      </div>
    )
  );
}
