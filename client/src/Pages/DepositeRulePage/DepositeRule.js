import React, { useEffect, useState } from "react";
import NormalButton from "../../Component/NormalButton";

import {
  fetGetBankAnnounc,
  selectBankAnnounc,
  fetPatchBankAnnounc,
  selectPatchBankAnnouncStatus,
  selectBankAnnouncStatus,
  selectPatchBankAnnounc,
} from "../../Feactures/bankApiSlice";
import { selectlogInData } from "../../Feactures/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./DepositeRule.module.css";

function DepositeRule() {
  const dispatch = useDispatch();

  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const bankAnnounc = useSelector(selectBankAnnounc);
  const patchBankAnnouncStatus = useSelector(selectPatchBankAnnouncStatus);
  const bankAnnouncStatus = useSelector(selectBankAnnouncStatus);
  const patchBankAnnounc = useSelector(selectPatchBankAnnounc);

  const [textDepo, setTextDepo] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [textWith, setTextWith] = useState("");

  useEffect(() => {
    dispatch(fetGetBankAnnounc({ api: "bankAnnounc", accessToken }));

    if (bankAnnouncStatus === "succeeded") {
      setTextDepo(bankAnnounc.data.bankAnnounc[0].description_deposit);
      setTextWith(bankAnnounc.data.bankAnnounc[0].description_withdraw);
    }
  }, [patchBankAnnounc]);

  const handleEdit = () => {
    dispatch(
      fetPatchBankAnnounc({
        api: "bankAnnounc",
        patchData: { description_deposit: textDepo },
        accessToken,
      })
    );
    if (patchBankAnnouncStatus === "succeeded") {
      setShow(!show);
    }
  };
  const handleEditWith = () => {
    dispatch(
      fetPatchBankAnnounc({
        api: "bankAnnounc",
        patchData: { description_withdraw: textWith },
        accessToken,
      })
    );
    if (patchBankAnnouncStatus === "succeeded") {
      setShow1(!show1);
    }
  };
  return (
    <>
      {bankAnnounc && (
        <div className="page_style">
          <div className={styles.doposite_container}>
            <div className={`box_shadow ${styles.deop_rule_box}`}>
              <p>Deposite Rule</p>
              {show ? (
                <textarea
                  value={textDepo}
                  onChange={(e) => setTextDepo(e.target.value)}
                />
              ) : (
                <p> {bankAnnounc.data.bankAnnounc[0].description_deposit}</p>
              )}
            </div>
            {show ? (
              <NormalButton
                onClick={() => handleEdit()}
                className={styles.deop_edit_btn}
              >
                Save
              </NormalButton>
            ) : (
              <NormalButton
                onClick={() => handleEdit(setShow(!show))}
                className={styles.deop_edit_btn}
              >
                Edit
              </NormalButton>
            )}
          </div>
          <div className={styles.doposite_container}>
            <div className={`box_shadow ${styles.deop_rule_box}`}>
              <p>Withdraw Rule</p>
              {show1 ? (
                <textarea
                  value={textWith}
                  onChange={(e) => setTextWith(e.target.value)}
                />
              ) : (
                <p> {bankAnnounc.data.bankAnnounc[0].description_withdraw}</p>
              )}
            </div>
            {show1 ? (
              <NormalButton
                onClick={() => handleEditWith()}
                className={styles.deop_edit_btn}
              >
                Save
              </NormalButton>
            ) : (
              <NormalButton
                onClick={() => setShow1(!show1)}
                className={styles.deop_edit_btn}
              >
                Edit
              </NormalButton>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default DepositeRule;
