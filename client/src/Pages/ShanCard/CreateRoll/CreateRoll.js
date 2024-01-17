import React, { useState } from "react";
import CreateShanForm from "../CreateShanForm";
import { selectShowRoll, setShowRoll } from "../../../Feactures/shan";
import { useSelector, useDispatch } from "react-redux";
import NormalButton from "../../../Component/NormalButton";
import styles from "../CreateShanForm.module.css";
import ShanRoll from "../ShanRoll";
import { selectlogInData } from "../../../Feactures/apiSlice";
import {
  fetPostShanRoll,
  selectPostShanRollStatus,
  setShanRoll,
} from "../../../Feactures/shan";
import { selectCollapsed } from "../../../Feactures/modalSlice";

function CreateRoll() {
  const showRoll = useSelector(selectShowRoll);
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const postShanRollStatus = useSelector(selectPostShanRollStatus);

  const collapsed = useSelector(selectCollapsed);

  const [name, setName] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [percentage, setPercentage] = useState("");
  const [bankerAmmount, setBankerAmmount] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const data = [
    { title: "Roll Name", value: name, setValue: setName },
    { title: "Min Amount", value: amount, setValue: setAmount },
    { title: "Max Amount", value: maxAmount, setValue: setMaxAmount },
    {
      title: "BankerAmmount",
      value: bankerAmmount,
      setValue: setBankerAmmount,
    },
    { title: "Percentage", value: percentage, setValue: setPercentage },
    { title: "Description", value: description, setValue: setDescription },
  ];

  const formData = new FormData();
  formData.append("role_name", name);
  formData.append("min_amount", Number(amount));
  formData.append("max_amount", Number(maxAmount));
  formData.append("banker_amount", Number(bankerAmmount));
  formData.append("per_amt", Number(percentage));
  formData.append("description", description);
  formData.append("img", img);

  const handlePost = (event) => {
    event.preventDefault();

    dispatch(fetPostShanRoll({ api: "shanrole", formData, accessToken }));

    if (postShanRollStatus === "succeeded") {
      dispatch(setShowRoll(false));
      setName("");
      setImg("");
      setAmount("");
      setMaxAmount("");
      setBankerAmmount("");
      setPercentage("");
      setDescription("");
    }
  };

  const handleCancel = () => {
    dispatch(setShowRoll(false));
    dispatch(setShanRoll());
  };

  return (
    <div
      className={collapsed ? "page_style_coll" : "page_style"}
      style={{ position: "relative" }}
    >
      <div className={styles.shan_header}>
        <p>Shan Roll</p>
        {!showRoll ? (
          <NormalButton
            onClick={() => dispatch(setShowRoll(true))}
            className={`btn_hover ${styles.create_btn}`}
          >
            Create Shan Roll
          </NormalButton>
        ) : (
          <NormalButton
            onClick={() => handleCancel()}
            className={`btn_hover ${styles.cancel_btn}`}
          >
            Cancel
          </NormalButton>
        )}
      </div>
      {!showRoll ? (
        <ShanRoll />
      ) : (
        <CreateShanForm
          title="Create Roll"
          data={data}
          setImg={setImg}
          handlePost={handlePost}
        />
      )}
    </div>
  );
}

export default CreateRoll;

//https://snyk.io/advisor/npm-package/react-poker
