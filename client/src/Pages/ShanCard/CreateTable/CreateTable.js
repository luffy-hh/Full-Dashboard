import React, { useEffect, useState } from "react";
import Button from "../../../Component/Button";

import { useSelector, useDispatch } from "react-redux";
import Dropdown from "../../../Component/Dropdown/Dropdown";
import { setShowDropDown } from "../../../Feactures/ShowHideSlice";
import { setShowRing, selectShowRing } from "../../../Feactures/shan";
import NormalButton from "../../../Component/NormalButton";
import {
  fetGetShanRoll,
  selectShanRoll,
  fetPostShanRing,
  selectPostShanRing,
  setRollIds,
  setPostShanRing,
} from "../../../Feactures/shan";
import { selectlogInData } from "../../../Feactures/apiSlice";
import styles from "../CreateShanForm.module.css";
import ShanTableCard from "../ShanTableCard";
import Error from "../../../Component/ErrorandSuccess/Error";
import Success from "../../../Component/ErrorandSuccess/Success";
import { selectCollapsed } from "../../../Feactures/modalSlice";

function CreateTable() {
  const dispatch = useDispatch();

  const showRing = useSelector(selectShowRing);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const shanRoll = useSelector(selectShanRoll);
  const shanRing = useSelector(selectPostShanRing);
  const collapsed = useSelector(selectCollapsed);

  const [roll, setRoll] = useState("Choose Roll Name");
  const [rollId, setRollId] = useState("");
  const [ringName, setRingName] = useState("");
  const [bankerAmount, setBankerAmount] = useState("");
  const [userId, setUserId] = useState("");
  const [description, setDescription] = useState("");

  const data = [
    { title: "bankerAmount", value: bankerAmount, setValue: setBankerAmount },
    { title: "Ring Name", value: ringName, setValue: setRingName },
    { title: "UserId", value: userId, setValue: setUserId },
    { title: "Description", value: description, setValue: setDescription },
  ];

  useEffect(() => {
    dispatch(fetGetShanRoll({ api: "shanroll", accessToken }));
  }, []);

  const shanRollData = shanRoll?.data.allShanRoll;

  const inputList = data.map((d) => (
    <div key={d.title}>
      <label>{d.title} </label>
      <input
        type="text"
        value={d.value}
        onChange={(e) => d.setValue(e.target.value)}
        disabled={d.title === "bankerAmount"}
      />
    </div>
  ));

  const getCatFun = (data) => {
    setRoll(data.roll_name);
    setRollId(data._id);
    setBankerAmount(data.banker_amount);
    dispatch(setShowDropDown());
    dispatch(setRollIds(data._id));
  };

  const list = shanRollData?.map((d) => (
    <li onClick={() => getCatFun(d)} key={d._id}>
      {d.roll_name}
    </li>
  ));

  const postData = {
    userId,
    ring_name: ringName,
    shan_roll: rollId,
    description,
    banker_amount: bankerAmount,
  };

  const handleCreateShanRing = () => {
    dispatch(setPostShanRing());
    dispatch(setShowRing(true));
  };

  const handleCancel = () => {
    dispatch(setPostShanRing());
    dispatch(setShowRing(false));
  };

  const handlePost = (e) => {
    e.preventDefault();

    dispatch(fetPostShanRing({ api: "shanring", postData, accessToken }));
  };

  console.log(shanRing);

  return (
    <div
      className={collapsed ? "page_style_coll" : "page_style"}
      style={{ position: "relative" }}
    >
      <div className={styles.shan_header}>
        <p>Shan Ring</p>
        {!showRing ? (
          <Dropdown width={"20rem"} title={roll} list={list} />
        ) : null}
        {!showRing ? (
          <NormalButton
            onClick={handleCreateShanRing}
            className={`btn_hover ${styles.create_btn}`}
          >
            Create Shan Ring
          </NormalButton>
        ) : (
          <NormalButton
            onClick={handleCancel}
            className={`btn_hover ${styles.cancel_btn}`}
          >
            Cancel
          </NormalButton>
        )}
      </div>
      {!showRing ? (
        <ShanTableCard />
      ) : (
        <div className={`${styles.shan_container} box_shadow`}>
          <div className={styles.shan_left}>
            <p>Create Table</p>
          </div>
          <form
            className={styles.shan_form}
            onSubmit={(event) => handlePost(event)}
          >
            {shanRing?.status === "fail" && (
              <Error message={shanRing?.message} />
            )}

            {shanRing?.status === "success" && (
              <Success message={"SuccessFully Created Table"} />
            )}
            <Dropdown width={"100%"} title={roll} list={list} />

            {inputList}

            <Button className={`btn_hover ${styles.roll_btn}`}>
              Create Table
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateTable;
