import React from "react";
import AllUsers from "../Pages/AllUsersPage/AllUsers";
import Layout from "../Pages/Layoutpage/Layout";
import Home from "../Pages/Homepage/Home";

import DepositeAcc from "../Pages/DepositeAccount/DepositeAcc";
import MasterReport from "../Pages/WinLoseReport/MasterReport";
import UserReport from "../Pages/WinLoseReport/UserReport";
import UserReportTable from "../Pages/WinLoseReport/Component/UserReportTable";
import AllAgentsPage from "../Pages/AllAgentsPage/AllAgentsPage";

import ToWithdraw from "../Pages/ToWithdrawPage/ToWithdraw";

import ToDeposit from "../Pages/ToDepositPage/ToDeposit";
import ToDepositHistory from "../Pages/ToDepositAndWithdrawHistory/ToDepositHistory";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Loginpage/Login";
import { selectMasterLayoutShow } from "../Feactures/apiSlice";
import { useSelector } from "react-redux";
const master = [
  { id: 0, path: "/master", route: <Home /> },
  { id: 3, path: "allusers", route: <AllUsers /> },
  { id: 4, path: "allagents", route: <AllAgentsPage /> },
  { id: 14, path: "depositeAcc", route: <DepositeAcc /> },
  { id: 19, path: "master-report", route: <MasterReport /> },
  { id: 20, path: "user-report", route: <UserReport /> },
  { id: 21, path: "user-report/:userId", route: <UserReportTable /> },
  { id: 22, path: "todeposit", route: <ToDeposit /> },
  { id: 23, path: "todeposit-withdraw-history", route: <ToDepositHistory /> },
  { id: 24, path: "towithdraw", route: <ToWithdraw /> },
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
