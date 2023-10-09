import React from "react";
import Switches from "./Switches";
import { useSelector } from "react-redux";
import { commisionDatas } from "../Feactures/AllUserPageSlice";
import Container from ".././Component/Container";
import styles from "./SwitchesGroup.module.css";
function SwitchesGroup() {
  const commisionData = useSelector(commisionDatas);
  const switchList = commisionData.map((c) => <Switches data={c} />);
  return (
    <section className={styles.game_section}>
      <h3>Game Permision</h3>

      <Container className={styles.game_permision}>{switchList}</Container>
    </section>
  );
}

export default SwitchesGroup;
