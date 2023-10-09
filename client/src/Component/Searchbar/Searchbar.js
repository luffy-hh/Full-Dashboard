import React from "react";
import Button from "../Button";
import styles from "./Searchbar.module.css";

import { BsSearch } from "react-icons/bs";

function Searchbar({ query, setQuery }) {
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.serach_form} onSubmit={(e) => handleSearch(e)}>
      <span>
        <BsSearch />
      </span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button className={styles.serach_btn}>Search</Button>
    </form>
  );
}

export default Searchbar;
