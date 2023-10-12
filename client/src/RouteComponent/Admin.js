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
import DepositeType from "../Pages/DepositeType/DepositeType";
import DepositeDiff from "../Pages/DepositeDifferent/DepositeDiff";
import DepositeRule from "../Pages/DepositeRulePage/DepositeRule";
import LotterySetting from "../Pages/NestPage/LotterySetting/LotterySetting";
import DepositeAcc from "../Pages/DepositeAccount/DepositeAcc";
import DepoAndWithLimit from "../Pages/DepositeandWithdrawLimit/DepoAndWithLimit";

const route = [
  { id: 1, path: "createunit", route: <CreateUnit /> },
  { id: 2, path: "unithistory", route: <UnitHistory /> },
  { id: 3, path: "allusers", route: <AllUsers /> },
  { id: 4, path: "allagents", route: <AllAgentsPage /> },
  { id: 5, path: "allaffiliateagents", route: <AllAffiliateAgents /> },
  { id: 6, path: "allmaster", route: <AllMaster /> },
  { id: 7, path: "alladmins", route: <AllAdmin /> },
  { id: 8, path: "lottery2d", route: <TwoDPage /> },
  { id: 9, path: "luckynumber", route: <LuckyNumber /> },
  { id: 10, path: "typesOfDeposite", route: <DepositeType /> },
  { id: 11, path: "differentOfDeposite", route: <DepositeDiff /> },
  { id: 12, path: "depositeRule", route: <DepositeRule /> },
  { id: 13, path: "lotterysetting", route: <LotterySetting /> },
  { id: 14, path: "depositeAcc", route: <DepositeAcc /> },
  { id: 15, path: "deposite-withdraw-limit", route: <DepoAndWithLimit /> },
];
function Admin() {
  const formshow = useSelector(selectSetShowForm);
  return (
    <Routes>
      <Route path="/admin" element={true ? <Layout /> : <Login />}>
        <Route index element={<Home />} />

        {route.map((d) => (
          <Route key={d.id} path={d.path} element={d.route} />
        ))}
      </Route>
    </Routes>
  );
}

export default Admin;
