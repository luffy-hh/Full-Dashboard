import React from "react";
import styles from "./AllAgentsPage.module.css";
import NormalButton from "../../Component/NormalButton";
import Container from "../../Component/Container";
import AllusersTable from "../Component/AllusersTable";

function AllAgentsPage() {
  return (
    <div className={styles.all_agents_page}>
      <Container className={styles.allusers_heading}>
        <p>Member</p>
        <NormalButton className={styles.add_new_btn}>Create Agent</NormalButton>
      </Container>

      <AllusersTable btnName="Create Agents" />
    </div>
  );
}

export default AllAgentsPage;
