import React, { useEffect, useState } from "react";
import styles from "./CreateShanForm.module.css";
import NormalButton from "../../Component/NormalButton";
import { selectlogInData } from "../../Feactures/apiSlice";

import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";

function ShanRoll() {
  const dispatch = useDispatch();
  const [allRole, setAllRole] = useState([]);

  const getRowInfo = async () => {
    const socket = io("https://gamevegas.online/allRoles");
    socket.on("responseRoleAllData", (data) => {
      console.log("Received message:", data.allRoleData);
      setAllRole(data.allRoleData);
    });
  };

  useEffect(() => {
    // getInformation();
    getRowInfo();
  }, []);

  const list = allRole?.map((d) => (
    <div key={d._id} className={styles.shan_roll_card}>
      <img src="/img/diamond.jpg" alt="grade_photo" />
      <div className={styles.shan_roll_description}>
        <p>{d.role_name}</p>
        <p className={styles.min_max_amount}>
          <span>Max Amount</span> <span>{d.max_amount}</span>
        </p>
        <p className={styles.min_max_amount}>
          <span>Min Amount</span> <span>{d.min_amount}</span>
        </p>

        <NormalButton className={`btn_hover ${styles.create_btn}`}>
          Edit
        </NormalButton>
      </div>
    </div>
  ));

  return <div className={styles.shan_roll_container}>{list}</div>;
}

export default ShanRoll;
