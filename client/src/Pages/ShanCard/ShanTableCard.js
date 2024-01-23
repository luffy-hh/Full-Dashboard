import React, { useEffect } from "react";
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

function ShanTableCard() {
  const dispatch = useDispatch();
  const postShanRing = useSelector(selectPostShanRing);
  const shanRing = useSelector(selectShanRing);
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const rollIds = useSelector(selectRollIds);

  useEffect(() => {
    dispatch(fetGetShanRing({ api: `shantable/${rollIds}`, accessToken }));
  }, [rollIds]);

  console.log(rollIds, "roll id");

  const shanRingData = shanRing?.data;

  const list = shanRingData?.map((d) => (
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
