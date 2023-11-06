import React, { useState } from "react";
import { Modal } from "antd";
import {
  selectModalDeposite,
  setModalDeposite,
} from "../../Feactures/modalSlice";
import {
  fetPostBankCat,
  selectPostBankCatStatus,
} from "../../Feactures/bankApiSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CustomBox.module.css";

function CreateDepositeBox() {
  const [bankCat, setBankCat] = useState("");
  const modalDeposite = useSelector(selectModalDeposite);
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const postBankCatStatus = useSelector(selectPostBankCatStatus);

  const handleSubmit = () => {
    dispatch(
      fetPostBankCat({
        api: "bankcat",
        postData: { bankCatName: bankCat },
        accessToken,
      })
    );

    dispatch(setModalDeposite(postBankCatStatus === "succeeded" && false));
  };

  return (
    <Modal
      title="Create Bank Category"
      open={modalDeposite}
      onOk={handleSubmit}
      onCancel={() => dispatch(setModalDeposite(false))}
      cancelButtonProps={{ style: { display: "none" } }}
      width={600}
      okText={postBankCatStatus === "loading" ? "loading" : "Submit"}
      className="modalStyle"
    >
      <form className={styles.bank_input}>
        <div>
          <label>Bank Category</label>
          <input value={bankCat} onChange={(e) => setBankCat(e.target.value)} />
        </div>
      </form>
    </Modal>
  );
}

export default CreateDepositeBox;
