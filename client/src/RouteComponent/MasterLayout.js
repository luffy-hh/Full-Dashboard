import React from "react";
import AllUsers from "../Pages/AllUsersPage/AllUsers";
import Layout from "../Pages/Layoutpage/Layout";
import Home from "../Pages/Homepage/Home";
import AllMaster from "../Pages/AllMaster/AllMaster";
import DepositeAcc from "../Pages/DepositeAccount/DepositeAcc";
import MasterReport from "../Pages/WinLoseReport/MasterReport";
import UserReport from "../Pages/WinLoseReport/UserReport";
import UserReportTable from "../Pages/WinLoseReport/Component/UserReportTable";
import AllAgentsPage from "../Pages/AllAgentsPage/AllAgentsPage";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Loginpage/Login";
import { selectMasterLayoutShow } from "../Feactures/apiSlice";
import { useSelector } from "react-redux";
const master = [
  { id: 0, path: "/master", route: <Home /> },
  { id: 3, path: "allusers", route: <AllUsers /> },
  { id: 4, path: "allagents", route: <AllAgentsPage /> },
  { id: 6, path: "allmaster", route: <AllMaster /> },
  { id: 14, path: "depositeAcc", route: <DepositeAcc /> },
  { id: 19, path: "master-report", route: <MasterReport /> },
  { id: 20, path: "user-report", route: <UserReport /> },
  { id: 21, path: "user-report/:userId", route: <UserReportTable /> },
];

function MasterLayout() {
  const masterLayoutShow = useSelector(selectMasterLayoutShow);
  return (
    <Routes>
      <Route path="/master" element={masterLayoutShow ? <Layout /> : <Login />}>
        {master.map((d) => (
          <Route key={d.id} path={d.path} element={d.route} />
        ))}
      </Route>
    </Routes>
  );
}

export default MasterLayout;
