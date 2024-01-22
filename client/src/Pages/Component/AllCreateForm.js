import React, { useState } from "react";
import Container from "../../Component/Container";
import { selectlogInData } from "../../Feactures/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setShowDropDown } from "../../Feactures/ShowHideSlice";

import Button from "../../Component/Button";
import styles from "./AllCreateForm.module.css";
import CancelHot from "../../GameApp/Comoponent/HotNumber/CancelHot";
import CopyText from "../../Component/CopyText/CopyText";
import Error from "../../Component/ErrorandSuccess/Error";
import Success from "../../Component/ErrorandSuccess/Success";
import Dropdown from "../../Component/Dropdown/Dropdown";

function AllCreateForm({
  hideFun,
  data,
  role,
  postFun,
  status,
  upLineData,
  postAllUser,
}) {
  const logInData = useSelector(selectlogInData);
  const showRole = role === "User" ? "Select Agent List" : "Select Master List";
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [security, setSecurity] = useState("");
  const [uplineId, setUpLineId] = useState(logInData.user.userId);
  const dispatch = useDispatch();
  const [copyPass, setCopyPass] = useState("");
  const loading = useSelector(status);
  const [selectName, setSelectName] = useState(showRole);

  const addAgentOrMaster = role === "Agent" || role === "User";

  // const upLineRole = role === "User" ? "Agent" : "Master";

  const addIdandName = (id, name) => {
    setUpLineId(id);
    setSelectName(name);
    dispatch(setShowDropDown());
  };
  const optionList = upLineData?.map((d) => (
    <li key={d.userId} onClick={() => addIdandName(d.userId, d.name)}>
      {d.name}
    </li>
  ));

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
    securityCode: security,
    role: role,
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
    setSecurity("");
  };

  return (
    <>
      <CopyText password={copyPass} />
      <Container className={styles.master_form_container}>
        <form className={styles.master_form}>
          <Container className={styles.master_form_grid}>
            {postAllUser.status === "success" && (
              <Success message={"Account created successfully"} />
            )}

            {postAllUser.status === "fail" && (
              <Error message={postAllUser.message.message} />
            )}

            {addAgentOrMaster && (
              <Container className={styles.option_form}>
                <Dropdown width={"100%"} title={selectName} list={optionList} />
              </Container>
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
        </form>
        <CancelHot hideFun={hideFun} top="10" right="10" />
      </Container>
    </>
  );
}

export default AllCreateForm;
