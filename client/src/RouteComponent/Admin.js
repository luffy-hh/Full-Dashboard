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
function Admin() {
  const formshow = useSelector(selectSetShowForm);
  return (
    <Routes>
      <Route path="/admin" element={formshow ? <Layout /> : <Login />}>
        <Route index element={<Home />} />
        <Route path="createunit" element={<CreateUnit />} />
        <Route path="unithistory" element={<UnitHistory />} />
        <Route path="allusers" element={<AllUsers />} />
        <Route path="allagents" element={<AllAgentsPage />} />
        <Route path="allaffiliateagents" element={<AllAffiliateAgents />} />
        <Route path="allmaster" element={<AllMaster />} />
        <Route path="alladmins" element={<AllAdmin />} />
        <Route path="lottery2d" element={<TwoDPage />} />
        <Route path="luckynumber" element={<LuckyNumber />} />
        <Route path="typesOfDeposite" element={<DepositeType />} />
      </Route>
    </Routes>
  );
}

export default Admin;
