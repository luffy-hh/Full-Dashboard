import React from "react";
import AllusersTable from "../Component/AllusersTable";
import NormalButton from "../../Component/NormalButton";
import Container from "../../Component/Container";
import styles from "./AllAffiliateAgents.module.css";

function AllAffiliateAgents() {
  return (
    <div className={styles.all_affiliate_agents}>
      <Container className={styles.allusers_heading}>
        <p>Member</p>
        <NormalButton className={styles.add_new_btn}>
          Create AffiliateAgent
        </NormalButton>
      </Container>
      <AllusersTable btnName="Create AffiliateAgent" />
    </div>
  );
}

export default AllAffiliateAgents;
