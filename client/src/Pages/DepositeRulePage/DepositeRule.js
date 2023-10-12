import React from "react";
import NormalButton from "../../Component/NormalButton";
import {
  selectTextOne,
  setTextOne,
  selectText,
  setText,
  selectTextTwo,
  selectTextTwoShow,
  setTextTwoShow,
  setTextTwo,
} from "../../Feactures/ShowHideSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./DepositeRule.module.css";

function DepositeRule() {
  const dispatch = useDispatch();

  const textOne = useSelector(selectTextOne);
  const text = useSelector(selectText);
  const textTwoShow = useSelector(selectTextTwoShow);
  const textTwo = useSelector(selectTextTwo);

  const depositeRuleData = [
    {
      id: 1,
      show: textOne,
      text,
      setShow: setTextOne,
      setText,
      title: "Payment Announcement Withdraw",
    },
    {
      id: 2,
      show: textTwoShow,
      text: textTwo,
      setShow: setTextTwoShow,
      setText: setTextTwo,
      title: "Payment Announcement Deposite",
    },
  ];

  const list = depositeRuleData.map((d) => (
    <div key={d.id} className={styles.doposite_container}>
      <div className={`box_shadow ${styles.deop_rule_box}`}>
        <p>{d.title}</p>
        {d.show ? (
          <textarea
            value={d.text}
            onChange={(e) => dispatch(d.setText(e.target.value))}
          />
        ) : (
          <p> {d.text}</p>
        )}
      </div>
      <NormalButton
        onClick={() => dispatch(d.setShow())}
        className={styles.deop_edit_btn}
      >
        {d.show ? "Save" : "Edit"}
      </NormalButton>
    </div>
  ));
  return <div className="page_style">{list}</div>;
}

export default DepositeRule;
