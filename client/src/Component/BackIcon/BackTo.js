import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import styles from "./BackTo.module.css";
import { useDispatch } from "react-redux";

function BackTo({ setLuckyNoShow, setLuckyTwoDShow, setLucyThreeDShow }) {
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(setLuckyNoShow(false));
    dispatch(setLuckyTwoDShow(false));
    dispatch(setLucyThreeDShow(false));
  };

  return (
    <button className={styles.back_icon} onClick={handleBack}>
      <IoArrowBackCircle />
    </button>
  );
}

export default BackTo;
