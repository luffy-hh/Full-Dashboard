import React, { useState } from "react";
import { Modal } from "antd";
import {
  selectModalDiffDepo,
  setModalDifDepo,
} from "../../Feactures/modalSlice";
import {
  fetPostBankName,
  selectPostBankNameStatus,
} from "../../Feactures/bankApiSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CustomBox.module.css";

function DifferentDepositeBox({ allBankArr }) {
  const modalDeposite = useSelector(selectModalDiffDepo);
  const dispatch = useDispatch();
  const [bankType, setBankType] = useState("");
  const [bankName, setBankName] = useState("");
  const [logo, setLogo] = useState(null);

  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const postBankNameStatus = useSelector(selectPostBankNameStatus);

  const bankList = allBankArr?.map((d) => (
    <option key={d._id} value={d._id}>
      {d.name}
    </option>
  ));

  const formData = new FormData();
  formData.append("bankTypeId", bankType);
  formData.append("name", bankName);
  formData.append("img", logo);

  const handlePost = () => {
    dispatch(fetPostBankName({ api: "bankName", formData, accessToken }));

    if (postBankNameStatus === "succeeded") {
      dispatch(setModalDifDepo(false));
      setBankType("");
      setBankName("");
      setLogo("");
    }
  };
  return (
    <Modal
      title="Create Bank Name"
      open={modalDeposite}
      onOk={() => handlePost()}
      onCancel={() => dispatch(setModalDifDepo(false))}
      cancelButtonProps={{ style: { display: "none" } }}
      width={600}
      okText={postBankNameStatus === "loading" ? "loading" : "Submit"}
      className="modalStyle"
    >
      <form className={styles.bank_input}>
        <div>
          <label>Bank Type</label>
          <select
            value={bankType}
            onChange={(e) => setBankType(e.target.value)}
          >
            <option value="">Select Bank Type</option>
            {bankList}
          </select>
        </div>
        <div>
          <label>Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </div>
        <div>
          <label>Logo</label>
          <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
        </div>
      </form>
    </Modal>
  );
}

export default DifferentDepositeBox;
