import React, { useState } from "react";
import Container from "../../Component/Container";
import { selectlogInData } from "../../Feactures/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../Component/ErrorandSuccess/Error";

import Button from "../../Component/Button";
import styles from "./AllCreateForm.module.css";
import CancelHot from "../../GameApp/Comoponent/HotNumber/CancelHot";
import CopyText from "../../Component/CopyText/CopyText";
import Success from "../../Component/ErrorandSuccess/Success";

function AllDownLineCreateForm({
  hideFun,
  data,
  role,
  postFun,
  status,
  postObj,
}) {
  const logInData = useSelector(selectlogInData);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [security, setSecurity] = useState("");
  const [uplineId, setUpLineId] = useState(logInData.user.userId);
  const dispatch = useDispatch();
  const [copyPass, setCopyPass] = useState("");
  const loading = useSelector(status);

  const fullData = data.map((item) => {
    switch (item.state) {
      case 1:
        return {
          ...item,
          value: name,
          setValue: setName,
        };
      case 5:
        return {
          ...item,
          value: email,
          setValue: setEmail,
        };
      case 3:
        return {
          ...item,
          value: password,
          setValue: setPassword,
        };
      case 4:
        return {
          ...item,
          value: confirmPassword,
          setValue: setComfirmPassword,
        };
      case 6:
        return {
          ...item,
          value: security,
          setValue: setSecurity,
        };

      default:
        return item;
    }
  });

  const dataList = fullData.map((d) => (
    <Container key={d.id} className={styles.lable_container}>
      <label htmlFor={d.id}>{d.label}</label>
      <input
        type="text"
        placeholder={`${d.id === role ? role : ""}`}
        disabled={d.id === role}
        value={d.value}
        onChange={(e) => d.setValue(e.target.value)}
      />
    </Container>
  ));

  const postData = {
    name,
    email,
    password,
    confirmPassword,
    role: role,
    securityCode: security,
    uplineId: uplineId,
  };

  const postHandle = (e, postFun) => {
    e.preventDefault();
    dispatch(postFun({ api: "user/signup", postData }));

    setCopyPass(password);
    setName("");
    setPassword("");
    setComfirmPassword("");
    setEmail("");
    setUpLineId("");
    setSecurity("");
  };

  console.log(postObj);

  return (
    <>
      <CopyText password={copyPass} />
      <Container className={styles.master_form_container}>
        <form className={styles.master_form}>
          <Container className={styles.master_form_grid}>
            {postObj.status === "success" && (
              <Success message={"Account created successfully"} />
            )}
            {postObj.status === "fail" && (
              <Error message={postObj.message.message} />
            )}
            {dataList}
          </Container>
          <Container className={styles.master_btn_container}>
            <Button
              onClick={(e) => postHandle(e, postFun)}
              className={styles.master_submit_btn}
            >
              {loading === "loading" ? "Loading" : "Save"}
            </Button>
          </Container>
          <CancelHot hideFun={hideFun} top="1" right="0" />
        </form>
      </Container>
    </>
  );
}

export default AllDownLineCreateForm;
