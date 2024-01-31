import React, { useEffect, useState } from "react";
import styles from "./CreateShanForm.module.css";
import ShanPlayer from "./ShanPlayer";
import {
  fetGetShanRing,
  selectShanRing,
  selectPostShanRing,
  selectRollIds,
} from "../../Feactures/shan";
import { selectlogInData } from "../../Feactures/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
const socket = io("https://gamevegas.online/allTables");

function ShanTableCard() {
  const dispatch = useDispatch();
  const postShanRing = useSelector(selectPostShanRing);
  const [table, setTable] = useState([]);
  const shanRing = useSelector(selectShanRing);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const rollIds = useSelector(selectRollIds);

  useEffect(() => {
    // dispatch(fetGetShanRing({ api: `shantable/${rollIds}`, accessToken }));
    socket.emit("requestTableDataAll", {
      idValue: rollIds,
    });

    socket.on("responseTableDataAll", (data) => {
      console.log("socket table", data);
      setTable(data.tableDataAll);
    });

    return () => {
      socket.off("responseTableDataAll");
    };
  }, [rollIds]);

  console.log(rollIds, "roll id", table);

  const list = table?.map((d) => (
    <div className={styles.shan_ring_box} key={d._id}>
      <div className={styles.shan_ring}>
        {/* <ShanPlayer players={d.players} /> */}
        <p className={styles.ring_name}>{d.tableName}</p>
      </div>
      <p>{d.players.length}/6</p>
    </div>
  ));
  console.log(shanRing && shanRing);
  return <div className={styles.shan_ring_container}>{list}</div>;
}

export default ShanTableCard;
