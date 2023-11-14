import React from "react";
import AllUsers from "../Pages/AllUsersPage/AllUsers";
import Layout from "../Pages/Layoutpage/Layout";
import Home from "../Pages/Homepage/Home";
import MasterReport from "../Pages/WinLoseReport/MasterReport";
import UserReport from "../Pages/WinLoseReport/UserReport";
import UserReportTable from "../Pages/WinLoseReport/Component/UserReportTable";
import AllAgentsPage from "../Pages/AllAgentsPage/AllAgentsPage";

import ToWithdraw from "../Pages/ToWithdrawPage/ToWithdraw";

import ToDeposit from "../Pages/ToDepositPage/ToDeposit";

import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Loginpage/Login";
import { selectMasterLayoutShow } from "../Feactures/apiSlice";
import { useSelector } from "react-redux";

import BankAcc from "../Pages/DepositeAccount/BankAcc";
import MasterWithdrawHistory from "../Pages/ToWithdrawPage/MasterWithdraw/MasterWithdrawHistory";
import MasterWithdrawRequest from "../Pages/ToWithdrawPage/MasterWithdraw/MasterWithdrawRequest";
import MasterDepositHistory from "../Pages/ToDepositPage/MasterDeposit/MasterDepositHistory";
import MasterDepositRequest from "../Pages/ToDepositPage/MasterDeposit/MasterDepositRequest";
import DownLineAgent from "../Component/DownLineUser/DownLineAgent";
import DownLineAllUser from "../Component/DownLineUser/DownLineAllUser";
const master = [
  { id: 0, path: "/master", route: <Home /> },
  { id: 3, path: "allusers", route: <AllUsers /> },
  { id: 4, path: "allagents", route: <AllAgentsPage /> },
  { id: 14, path: "bankAcc", route: <BankAcc /> },
  { id: 19, path: "master-report", route: <MasterReport /> },
  { id: 20, path: "user-report", route: <UserReport /> },
  { id: 21, path: "user-report/:userId", route: <UserReportTable /> },
  { id: 22, path: "todeposit", route: <ToDeposit /> },
  { id: 23, path: "todeposit-request", route: <MasterDepositRequest /> },
  { id: 25, path: "todeposit-history", route: <MasterDepositHistory /> },
  { id: 24, path: "towithdraw", route: <ToWithdraw /> },
  { id: 26, path: "towithdraw-request", route: <MasterWithdrawRequest /> },
  { id: 27, path: "towithdraw-history", route: <MasterWithdrawHistory /> },
  { id: 31, path: "down_line_agent", route: <DownLineAgent /> },
  { id: 32, path: "down_line_agent/:userId", route: <DownLineAllUser /> },
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
