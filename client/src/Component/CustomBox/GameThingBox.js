import React, { useState } from "react";
import { Modal } from "antd";
import {
  selectModalGameThing,
  setModalGameThing,
} from "../../Feactures/modalSlice";
import { fetPostGameThing } from "../../Feactures/bankApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEditGameThing,
  selectPostGameThingStatus,
} from "../../Feactures/bankApiSlice";
import styles from "./CustomBox.module.css";

function GameThingBox({ accessToken }) {
  const dispatch = useDispatch();
  const modalGameThing = useSelector(selectModalGameThing);
  const editGameThing = useSelector(selectEditGameThing);
  const [text, setText] = useState("");
  const status = useSelector(selectPostGameThingStatus);

  const handleSecret = () => {
    if (editGameThing === "Running Text") {
      dispatch(
        fetPostGameThing({
          api: "things",
          postData: {
            settingName: editGameThing,
            settingText: text,
          },
          accessToken,
        })
      );

      dispatch(setModalGameThing(false));
    } else {
      dispatch(
        fetPostGameThing({
          api: "things",
          postData: { settingName: editGameThing, settingText: text },
          accessToken,
        })
      );
    }
    dispatch(setModalGameThing(false));
  };
  return (
    <>
      <Modal
        title={`Edit ${editGameThing}`}
        centered
        open={modalGameThing}
        onOk={handleSecret}
        onCancel={() => dispatch(setModalGameThing(false))}
        width={700}
        okText={status === "loading" ? "Loading" : "Save"}
        className="modalStyle"
      >
        <div className={styles.secret_container}>
          <div className={styles.secret_box}>
            <label>Enter New Text </label>
            <input
              type="text"
              className="input"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default GameThingBox;
