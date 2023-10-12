import React from "react";
import { useNavigate } from "react-router-dom";
import { PiNumberCircleTwoDuotone } from "react-icons/pi";
import { PiNumberCircleThreeDuotone } from "react-icons/pi";
import styles from "./LotterySetting.module.css";

const lotteryData = [
  {
    id: 1,
    text: "Thai 2D morning",
    icon: <PiNumberCircleTwoDuotone />,
    link: "admin/lottery2d",
  },
  { id: 2, text: "Thai 3D morning", icon: <PiNumberCircleThreeDuotone /> },
];

function LotterySetting() {
  const navigate = useNavigate();
  const handleChange = (link) => {
    navigate(`/${link}`);
  };
  const lottery = lotteryData.map((l) => (
    <div
      onClick={() => handleChange(l.link)}
      key={l.id}
      className={`box_shadow ${styles.lottery_card}`}
    >
      <span>{l.icon}</span>
      <p>{l.text}</p>
    </div>
  ));
  return (
    <div className="page_style">
      <div className={`box_shadow ${styles.lottery_setting_container}`}>
        {lottery}
      </div>
    </div>
  );
}

export default LotterySetting;
