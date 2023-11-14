import React from "react";
import AllUsers from "../Pages/AllUsersPage/AllUsers";
import Layout from "../Pages/Layoutpage/Layout";
import Home from "../Pages/Homepage/Home";
import UserReport from "../Pages/WinLoseReport/UserReport";
import UserReportTable from "../Pages/WinLoseReport/Component/UserReportTable";
import AllAgentsPage from "../Pages/AllAgentsPage/AllAgentsPage";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Loginpage/Login";
import { selectAgentLayoutShow } from "../Feactures/apiSlice";
import ToDepositHistory from "../Pages/ToDepositAndWithdrawHistory/ToDepositHistory";

import ToWithdraw from "../Pages/ToWithdrawPage/ToWithdraw";
import ToDeposit from "../Pages/ToDepositPage/ToDeposit";
import ToDepositRequests from "../Pages/ToDepositAndWithdrawHistory/ToDepositRequests";
import { useSelector } from "react-redux";
import BankAcc from "../Pages/DepositeAccount/BankAcc";
import AgentWithdrawHistory from "../Pages/ToWithdrawPage/AgentWithdraw/AgentWithdrawHistory";
import AgentWithdrawRequest from "../Pages/ToWithdrawPage/AgentWithdraw/AgentWithdrawRequest";
import AgentDepositRequest from "../Pages/ToDepositPage/AgentDeposit/AgentDepositRequest";
import AgentDepositHistory from "../Pages/ToDepositPage/AgentDeposit/AgentDepositHistory";
import DownLineUser from "../Component/DownLineUser/DownLineUser";
const agent = [
  { id: 0, path: "/agent", route: <Home /> },
  { id: 3, path: "allusers", route: <AllUsers /> },
  { id: 4, path: "allagents", route: <AllAgentsPage /> },

  { id: 14, path: "bankAcc", route: <BankAcc /> },
  { id: 20, path: "user-report", route: <UserReport /> },
  { id: 21, path: "user-report/:userId", route: <UserReportTable /> },
  { id: 22, path: "todeposit", route: <ToDeposit /> },
  { id: 23, path: "todeposit-request", route: <AgentDepositRequest /> },
  { id: 25, path: "todeposit-history", route: <AgentDepositHistory /> },
  { id: 24, path: "towithdraw", route: <ToWithdraw /> },
  { id: 26, path: "towithdraw-request", route: <AgentWithdrawRequest /> },
  { id: 27, path: "towithdraw-history", route: <AgentWithdrawHistory /> },
  { id: 29, path: "down_line_user", route: <DownLineUser /> },
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
