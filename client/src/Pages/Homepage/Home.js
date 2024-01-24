import React, { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { selectChartData } from "../../Feactures/winOrLoseSlice";
import {
  selectlogInData,
  selectAllCounts,
  fetGetAllCounts,
} from "../../Feactures/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Home.module.css";
import BarChart from "./ChartForAdmin/BarChart";
import DohnutChart from "./ChartForAdmin/DohnutChart";
import AllAmountByGame from "./AllamountbyGame/AllAmountByGame";
import { selectCollapsed } from "../../Feactures/modalSlice";
import { io } from "socket.io-client";
const socket = io("https://gamevegas.online", { autoConnect: false });
const dashUser = [
  { id: 1, user: "Master", total: "280" },
  { id: 2, user: "Agent", total: "300" },
  { id: 3, user: "Users", total: "3500" },
  { id: 4, user: "Total Profit", total: "40000000" },
];

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

function Home() {
  useEffect(() => {
    socket.connect();
    socket.on("joinSocket", (data) => {
      console.log(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const allCounts = useSelector(selectAllCounts);
  const accessToken = logInData.token;
  const collapsed = useSelector(selectCollapsed);

  useEffect(() => {
    dispatch(fetGetAllCounts({ api: "userCounts", accessToken }));
  }, []);

  const allCountsObj = allCounts?.data.resObj;

  const chartData = useSelector(selectChartData);
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
    },
  };

  const [chooseChar, setChooseChar] = useState("win");
  const [data, setData] = useState({
    labels: chartData.map((d) => d.year),
    datasets: [
      {
        label: `User ${chooseChar}`,
        data: chartData.map((d) => (chooseChar === "win" ? d.win : d.lose)),
        backgroundColor: ["#1d4ed8"],
      },
    ],
  });

  const [donut, setDonut] = useState({
    labels: chartData.map((d) => d.game),
    datasets: [
      {
        label: "User Lose ",
        data: chartData.map((d) => d.lose),
      },
    ],
  });

  return (
    <div
      style={{ backgroundColor: "#111827" }}
      className={collapsed ? "page_style_coll" : "page_style"}
    >
      <ul className={styles.dash_all_user}>
        <li>
          <div className={styles.dash_user}>
            <span className={styles.dash_amount}>
              {allCountsObj?.masterCount}
            </span>
            <span>Master</span>
          </div>
          <span className={styles.dash_user_icon}>
            <BsPeopleFill />
          </span>
        </li>
        <li>
          <div className={styles.dash_user}>
            <span className={styles.dash_amount}>
              {allCountsObj?.agentCount}
            </span>
            <span>Agent</span>
          </div>
          <span className={styles.dash_user_icon}>
            <BsPeopleFill />
          </span>
        </li>
        <li>
          <div className={styles.dash_user}>
            <span className={styles.dash_amount}>
              {allCountsObj?.userCount}
            </span>
            <span>Users</span>
          </div>
          <span className={styles.dash_user_icon}>
            <BsPeopleFill />
          </span>
        </li>
      </ul>

      <div>
        <BarChart chartData={data} />
        {/* <select
          value={chooseChar}
          onChange={(e) => setChooseChar(e.target.value)}
        >
          <option value="">Choose User Win/Lose</option>
          <option value="win">User Win</option>
          <option value="lose">User Lose</option>
        </select> */}
        <DohnutChart chartData={donut} options={options} />
      </div>
      <AllAmountByGame />
    </div>
  );
}

export default Home;
