import React from "react";
import NormalButton from "../../../Component/NormalButton";

import { useSelector, useDispatch } from "react-redux";
import styles from "./HotNumber.module.css";

function HotNoFooter({
  forCss,
  clickedNos,
  amounts,
  setAddList,
  setAmount,
  lists,
  clickListHistory,
  lottery,
}) {
  const clickNo = useSelector(clickedNos);
  const amount = useSelector(amounts);
  const list = useSelector(lists);

  const secondNo = lottery && useSelector(lottery);
  const conditionVal = secondNo === 0 ? true : secondNo;

  const dispatch = useDispatch();

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    <section style={forCss}>
      <div
        className={styles.hotNo_footer}
        style={{
          backgroundImage: "url(/img/TwoThree/BottomBar.png)",
          width: "70vw",
          height: "17vh",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <ul className={styles.hot_no_list}>
          <li
            className={styles.no_box}
            key={"box1"}
            style={{
              backgroundImage: "url(/img/TwoThree/NumberBox.png)",
            }}
          >
            <h3>
              {clickNo}
              {secondNo === "" ? null : secondNo}
            </h3>
          </li>
          <li className={styles.amount} key={"box2"}>
            <span>Amount</span>
            <div
              className={styles.hot_no_amount}
              style={{
                backgroundImage: "url(/img/TwoThree/AmountBox.png)",
              }}
            >
              <input
                type="text"
                value={amount}
                onChange={(e) => dispatch(setAmount(e.target.value))}
              />
            </div>
          </li>
          <li key="box-3">
            <NormalButton className={`btn_opacity ${styles.hot_no_btn}`}>
              <img
                className={styles.reverse}
                src="/img/TwoThree/Reverse.png"
                alt="R_photo"
              />
            </NormalButton>
          </li>
          <li key="box-4">
            <NormalButton className={`btn_opacity ${styles.hot_no_btn}`}>
              <img
                className={styles.reverse}
                src="/img/TwoThree/R.png"
                alt="R_photo"
              />
            </NormalButton>
          </li>
          <li key="box-5">
            <NormalButton
              onClick={() =>
                dispatch(
                  conditionVal
                    ? setAddList({
                        id: list.length + 1,
                        no: `${clickNo}${secondNo}`,
                        amount,
                        date: `${month}/${day}/${year}`,
                      })
                    : setAddList({
                        id: list.length + 1,
                        no: clickNo,
                        amount,
                        date: `${month}/${day}/${year}`,
                      })
                )
              }
              className={`btn_opacity ${styles.hot_no_btn} ${
                (clickNo == 0 ? true : clickNo) && amount
                  ? ""
                  : styles.disable_no
              }`}
            >
              <img
                className={styles.make_list}
                src="/img/TwoThree/MakeList.png"
                alt="make list photo"
              />
            </NormalButton>
          </li>
          <li key="box-6">
            <button
              onClick={() => dispatch(clickListHistory())}
              className={`btn_opacity ${styles.hot_no_btn} `}
            >
              <img
                className={styles.make_list}
                src="/img/TwoThree/ListBtn.png"
                alt="list photo"
              />
            </button>
          </li>
          <li key="box-7">
            <NormalButton className={`btn_opacity ${styles.hot_no_btn}`}>
              <img
                className={styles.ok_img}
                src="/img/TwoThree/Ok.png"
                alt="R_photo"
              />
            </NormalButton>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default HotNoFooter;
