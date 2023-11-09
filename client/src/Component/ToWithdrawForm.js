import React, { useEffect, useState } from "react";

import Button from "../Component/Button";
import {
  selectBankNameUpline,
  fetGetBankNameUpline,
  fetPostWithdraw,
  selectPostWithdrawStatus,
} from "../Feactures/bankApiSlice";
import Dropdown from "../Component/Dropdown/Dropdown";
import { selectlogInData } from "../Feactures/apiSlice";
import { setShowDropDown } from "../Feactures/ShowHideSlice";
import styles from "./ToDepositWithdraw.module.css";
import { useSelector, useDispatch } from "react-redux";

function ToWithdrawForm() {
  const [bankName, setBankName] = useState("Choose Bank Name");
  const [bankNameId, setBankNameId] = useState("");
  const [recAcc, setRecAcc] = useState("");
  const [recAccName, setRecAccName] = useState("");
  const [amount, setAmount] = useState("");
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const bankNameUpline = useSelector(selectBankNameUpline);
  const dispatch = useDispatch();
  const postWithdrawStatus = useSelector(selectPostWithdrawStatus);

  useEffect(() => {
    dispatch(fetGetBankNameUpline({ api: "bankNameUpline", accessToken }));
  }, []);

  const bankNameArr = bankNameUpline?.data.allBankName;

  const handleName = (id, name) => {
    setBankNameId(id);
    setBankName(name);
    dispatch(setShowDropDown());
  };

  const list = bankNameArr?.map((d) => (
    <li key={d._id} onClick={() => handleName(d._id, d.bankName)}>
      {" "}
      {d.bankName}{" "}
    </li>
  ));

  console.log(bankNameArr && bankNameArr);

  const postData = {
    bankNameId: bankNameId,
    recAcc,
    recAccName,
    amount: Number(amount),
  };

  console.log(bankNameId);

  const handlePost = (e) => {
    e.preventDefault();
    dispatch(fetPostWithdraw({ api: "withdarw", postData, accessToken }));
  };
  return (
    <div className={`${styles.deop_with_form_container} box_shadow`}>
      <div className={styles.depo_with_bg}>
        <h3>Withdraw Form</h3>
      </div>

      <form className={styles.depo_with_form} onSubmit={(e) => handlePost(e)}>
        <div>
          <label>Select Bank Name</label>
          {bankNameArr && <Dropdown title={bankName} list={list} />}{" "}
        </div>
        <div>
          <label>Receive Account Number</label>
          <input
            type="text"
            value={recAcc}
            onChange={(e) => setRecAcc(e.target.value)}
          />
        </div>
        <div>
          <label>Receive Account Name</label>
          <input
            type="text"
            value={recAccName}
            onChange={(e) => setRecAccName(e.target.value)}
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className={styles.dep_with_btn}>
          <Button className="btn_hover">
            {postWithdrawStatus === "loading" ? "Loading" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ToWithdrawForm;
