import React from "react";
import UploadImg from "../../Component/UploadImg/UploadImg";
import styles from "./CreateShanForm.module.css";
import Button from "../../Component/Button";
import { selectPostShanRoll } from "../../Feactures/shan";
import Success from "../../Component/ErrorandSuccess/Success";
import { useSelector } from "react-redux";

function CreateShanForm({ title, data, setImg, handlePost }) {
  const postShanRing = useSelector(selectPostShanRoll);
  const list = data.map((d) => (
    <div key={d.title}>
      <label>{d.title} </label>
      <input
        type="text"
        value={d.value}
        onChange={(e) => d.setValue(e.target.value)}
      />
    </div>
  ));
  return (
    <div className={`${styles.shan_container} box_shadow`}>
      <div className={styles.shan_left}>
        <p>{title}</p>
      </div>
      <form
        className={styles.shan_form}
        onSubmit={(event) => handlePost(event)}
      >
        {postShanRing?.status === "success" && (
          <Success message={"Shan Role created Successfully"} />
        )}
        {list}
        <UploadImg setFile={setImg} />
        <Button className={`btn_hover ${styles.roll_btn}`}>Create Roll</Button>
      </form>
    </div>
  );
}

export default CreateShanForm;
