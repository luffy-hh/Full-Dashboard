import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <>
      <Navbar />
      <div className={styles.layout}>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
