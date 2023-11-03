import React, { useState } from "react";
import styles from "./UploadImg.module.css";

function UploadImg({ setFile }) {
  const [imgName, setImgName] = useState("");
  const handleImg = (e) => {
    setFile(e.target.files[0]);
    setImgName(e.target.files[0].name);
  };
  return (
    <>
      <label htmlFor="upload" className={styles.upload_label}>
        <img src="/img/upload.png" />
        <span>{imgName}</span>
      </label>
      <input
        id="upload"
        type="file"
        onChange={(e) => handleImg(e)}
        style={{ display: "none" }}
      />
    </>
  );
}

export default UploadImg;
