import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Homepage/Home";
import Layout from "../Pages/Layoutpage/Layout";
import CreateUnit from "../Pages/CreateUnitpage/CreateUnit";
import UnitHistory from "../Pages/UnitHistorypage/UnitHistory";
import AllUsers from "../Pages/AllUsersPage/AllUsers";
import AllAgentsPage from "../Pages/AllAgentsPage/AllAgentsPage";
import AllAffiliateAgents from "../Pages/AllAffiliateAgents/AllAffiliateAgents";
import AllMaster from "../Pages/AllMaster/AllMaster";
import AllAdmin from "../Pages/AllAdmin/AllAdmin";
import TwoDPage from "../Pages/NestPage/TwoDPage/TwoDPage";
import Login from "../Pages/Loginpage/Login";
import { selectSetShowForm } from "../Feactures/apiSlice";
import { useSelector } from "react-redux";
import LuckyNumber from "../Pages/LuckyNumberPage/LuckyNumber";

import DepositeRule from "../Pages/DepositeRulePage/DepositeRule";
import LotterySetting from "../Pages/NestPage/LotterySetting/LotterySetting";
import DepoAndWithLimit from "../Pages/DepositeandWithdrawLimit/DepoAndWithLimit";
import UnitHistoryTransfer from "../Pages/UnitHistoryTransfer/UnitHistoryTransfer";
import GameCategories from "../Pages/Game Categories/GameCategories";
import ThaiTwoD12am from "../Pages/TwoDReport/ThaiTwoD12am";
import MasterReport from "../Pages/WinLoseReport/MasterReport";
import UserReport from "../Pages/WinLoseReport/UserReport";
import UserReportTable from "../Pages/WinLoseReport/Component/UserReportTable";
import BankName from "../Pages/DepositeAccount/BankName";
import BankType from "../Pages/DepositeDifferent/BankType";
import BankCategory from "../Pages/DepositeType/BankCategory";
import BankAcc from "../Pages/DepositeAccount/BankAcc";
import AdminWithdrawHistory from "../Pages/ToWithdrawPage/AdminWithdraw/AdminWithdrawHistory";

import AdminWithdrawRequest from "../Pages/ToWithdrawPage/AdminWithdraw/AdminWithdrawRequest";
import AdminDepositHistory from "../Pages/ToDepositPage/AdminDeposit/AdminDepositHistory";
import AdminDepositRequest from "../Pages/ToDepositPage/AdminDeposit/AdminDepositRequest";

const admin = [
  { id: 0, path: "/admin", route: <Home /> },
  { id: 1, path: "createunit", route: <CreateUnit /> },
  { id: 2, path: "unithistory", route: <UnitHistory /> },
  { id: 3, path: "allusers", route: <AllUsers /> },
  { id: 4, path: "allagents", route: <AllAgentsPage /> },
  { id: 5, path: "allaffiliateagents", route: <AllAffiliateAgents /> },
  { id: 6, path: "allmaster", route: <AllMaster /> },
  { id: 7, path: "alladmins", route: <AllAdmin /> },
  { id: 8, path: "lottery2d", route: <TwoDPage /> },
  { id: 9, path: "luckynumber", route: <LuckyNumber /> },
  { id: 10, path: "bankCategory", route: <BankCategory /> },
  { id: 11, path: "bankType", route: <BankType /> },
  { id: 12, path: "depositeRule", route: <DepositeRule /> },
  { id: 13, path: "lotterysetting", route: <LotterySetting /> },
  { id: 14, path: "bankName", route: <BankName /> },
  { id: 22, path: "bankAcc", route: <BankAcc /> },
  { id: 15, path: "deposite-withdraw-limit", route: <DepoAndWithLimit /> },
  { id: 16, path: "unithistoryTransfer", route: <UnitHistoryTransfer /> },
  { id: 17, path: "game-categories", route: <GameCategories /> },
  { id: 18, path: "thai2D-12am", route: <ThaiTwoD12am /> },
  { id: 19, path: "master-report", route: <MasterReport /> },
  { id: 20, path: "user-report", route: <UserReport /> },
  { id: 21, path: "user-report/:userId", route: <UserReportTable /> },
  { id: 28, path: "todeposit-history", route: <AdminDepositHistory /> },
  { id: 29, path: "todeposit-request", route: <AdminDepositRequest /> },

  { id: 26, path: "towithdraw-request", route: <AdminWithdrawRequest /> },
  { id: 27, path: "towithdraw-history", route: <AdminWithdrawHistory /> },
];

function Admin() {
  const formshow = useSelector(selectSetShowForm);
  // const currentLoginUser = useSelector(selectcurrentLoginUser);

  // const currentLogin =
  //   (currentLoginUser === "Admin" && admin) ||
  //   (currentLoginUser === "Master" && master) ||
  //   [];

  return (
    <Routes>
      <Route path="/admin" element={formshow ? <Layout /> : <Login />}>
        {admin.map((d) => (
          <Route key={d.id} path={d.path} element={d.route} />
        ))}
      </Route>
    </Routes>
  );
}

export default Admin;
