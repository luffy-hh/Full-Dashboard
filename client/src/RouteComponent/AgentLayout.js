import React from "react";
import AllUsers from "../Pages/AllUsersPage/AllUsers";
import Layout from "../Pages/Layoutpage/Layout";
import Home from "../Pages/Homepage/Home";
import DepositeAcc from "../Pages/DepositeAccount/DepositeAcc";

import UserReport from "../Pages/WinLoseReport/UserReport";
import UserReportTable from "../Pages/WinLoseReport/Component/UserReportTable";
import AllAgentsPage from "../Pages/AllAgentsPage/AllAgentsPage";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Loginpage/Login";
import { selectAgentLayoutShow } from "../Feactures/apiSlice";
import { useSelector } from "react-redux";
const agent = [
  { id: 0, path: "/agent", route: <Home /> },
  { id: 3, path: "allusers", route: <AllUsers /> },
  { id: 4, path: "allagents", route: <AllAgentsPage /> },

  { id: 14, path: "depositeAcc", route: <DepositeAcc /> },
  { id: 20, path: "user-report", route: <UserReport /> },
  { id: 21, path: "user-report/:userId", route: <UserReportTable /> },
];

function AgentLayout() {
  const agentLayoutShow = useSelector(selectAgentLayoutShow);
  return (
    <Routes>
      <Route path="/agent" element={agentLayoutShow ? <Layout /> : <Login />}>
        {agent.map((d) => (
          <Route key={d.id} path={d.path} element={d.route} />
        ))}
      </Route>
    </Routes>
  );
}

export default AgentLayout;
