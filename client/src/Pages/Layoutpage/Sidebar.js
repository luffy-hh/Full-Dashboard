import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { useDispatch } from "react-redux";
import { BsFillGridFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";

import { BsFillDpadFill } from "react-icons/bs";

import { GiPokerHand } from "react-icons/gi";
import { AiFillSetting } from "react-icons/ai";
import { PiNumberSquareSevenBold } from "react-icons/pi";
import { RiBankCardFill } from "react-icons/ri";
import { BiDollarCircle } from "react-icons/bi";
import { BiSolidReport } from "react-icons/bi";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { ImHistory } from "react-icons/im";
import { GrDocumentUpdate } from "react-icons/gr";
import { selectCollapsed } from "../../Feactures/modalSlice";
import { FaDirections } from "react-icons/fa";

import { MdRequestQuote } from "react-icons/md";
import NormalButton from "../../Component/NormalButton";

import {
  selectcurrentLoginUser,
  setFormShow,
  setAgentLayoutShow,
  setMasterLayoutShow,
} from "../../Feactures/apiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Menu } from "antd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const agentData = [
  getItem("Agent Dashboard", "/agent", <BsFillGridFill />),
  getItem("Unit", null, <BsFillPersonLinesFill />, [
    getItem(
      "Unit Transfer History",
      "unithistoryTransfer",
      <BsFillPersonFill />
    ),
  ]),
  getItem("User", null, <BsPersonCircle />, [
    getItem("All Users", "down_line_user", <BsPeople />),
  ]),

  getItem("Fast Transfer", "unitTransferTo", <FaDirections />),
  getItem("Bank", null, <RiBankCardFill />, [
    getItem("Bank Account", "bankAcc", <BiDollarCircle />),
  ]),
  getItem("Win/Lose Report", null, <BiSolidReport />, [
    getItem("User Report", "user-report", <BiSolidReport />),
  ]),
  getItem("Deposit", null, <RiLuggageDepositFill />, [
    getItem("To Deposit", "todeposit", <RiLuggageDepositFill />),
    getItem("To Deposit Request", "todeposit-request", <MdRequestQuote />),
    getItem("To Deposit History", "todeposit-history", <ImHistory />),
  ]),
  getItem("Withdraw", null, <BiMoneyWithdraw />, [
    getItem("To WithDraw", "towithdraw", <BiMoneyWithdraw />),
    getItem("To Withdraw Request", "towithdraw-request", <MdRequestQuote />),
    getItem("To Withdraw History", "towithdraw-history", <ImHistory />),
  ]),
];

const masterData = [
  getItem("Master Dashboard", "/master", <BsFillGridFill />),
  getItem("User", null, <BsPersonCircle />, [
    getItem("All Agent", "down_line_agent", <BsPeople />),
  ]),

  getItem("Fast Transfer", "unitTransferTo", <FaDirections />),
  getItem("Bank", null, <RiBankCardFill />, [
    getItem("Bank Account", "bankAcc", <BiDollarCircle />),
  ]),
  getItem("Win/Lose Report", null, <BiSolidReport />, [
    getItem("Master Report", "master-report", <BiSolidReport />),
    getItem("User Report", "user-report", <BiSolidReport />),
  ]),
  getItem("Deposit", null, <RiLuggageDepositFill />, [
    getItem("To Deposit", "todeposit", <RiLuggageDepositFill />),
    getItem("To Deposit Request", "todeposit-request", <MdRequestQuote />),
    getItem("To Deposit History", "todeposit-history", <ImHistory />),
  ]),
  getItem("Withdraw", null, <BiMoneyWithdraw />, [
    getItem("To WithDraw", "towithdraw", <BiMoneyWithdraw />),
    getItem("To Withdraw Request", "towithdraw-request", <MdRequestQuote />),
    getItem("To Withdraw History", "towithdraw-history", <ImHistory />),
  ]),
];

const adminData = [
  getItem("Dashboard", "/admin", <BsFillGridFill />),
  getItem("Unit", null, <BsFillPersonLinesFill />, [
    getItem("Create Unit", "createunit", <BsFillPersonPlusFill />),
    getItem("Unit History", "unithistory", <BsFillPersonFill />),
    getItem(
      "Unit Transfer History",
      "unithistoryTransfer",
      <BsFillPersonFill />
    ),
  ]),

  getItem("Users", null, <BsPersonCircle />, [
    getItem("All User", "allusers", <BsPeople />),
    getItem("All Agent", "allagents", <BsPeople />),
    getItem("All Master", "allmaster", <BsPeople />),
    getItem("All Admin", "alladmins", <BsPeople />),
  ]),

  getItem("Shan Card", null, <GiPokerHand />, [
    getItem("Create Roll", "create-roll", <GiPokerHand />),
    getItem("Create Table", "create-table", <GiPokerHand />),
  ]),

  getItem("Game Setting", null, <AiFillSetting />, [
    getItem("Game Categories", "game-categories", <AiFillSetting />),
  ]),

  getItem("2D-3D Report", null, <BiSolidReport />, [
    getItem("Lucky Number", "luckynumber", <PiNumberSquareSevenBold />),
    getItem("All 2D-3D Report", "thai2D-12am", <BsPeople />),
    getItem("2D-3D Lottery Setting", "lotterysetting", <BsFillDpadFill />),
  ]),

  getItem("Bank", null, <RiBankCardFill />, [
    getItem("Bank Category", "bankCategory", <BiDollarCircle />),
    getItem("Bank Type", "bankType", <BiDollarCircle />),
    getItem("Bank Name", "bankName", <BiDollarCircle />),
    getItem("Bank Account", "bankAcc", <BiDollarCircle />),
    getItem("Bank Rules", "depositeRule", <BiDollarCircle />),
  ]),
  getItem("Win/Lose Report", null, <BiSolidReport />, [
    getItem("Master Report", "master-report", <BiSolidReport />),
    getItem("User Report", "user-report", <BiSolidReport />),
  ]),
  getItem("Deposit", null, <RiLuggageDepositFill />, [
    getItem("To Deposit Request", "todeposit-request", <MdRequestQuote />),
    getItem("To Deposit History", "todeposit-history", <ImHistory />),
  ]),
  getItem("Withdraw", null, <BiMoneyWithdraw />, [
    getItem("To Withdraw Request", "towithdraw-request", <MdRequestQuote />),
    getItem("To Withdraw History", "towithdraw-history", <ImHistory />),
  ]),

  getItem("Game Theme", "game-theme", <AiFillSetting />),
];

function Sidebar() {
  const navigate = useNavigate();
  const currentLoginUser = useSelector(selectcurrentLoginUser);
  const collapsed = useSelector(selectCollapsed);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    currentLoginUser !== "" &&
      ((currentLoginUser === "Admin" && setData(adminData)) ||
        (currentLoginUser === "Master" && setData(masterData)) ||
        (currentLoginUser === "Agent" && setData(agentData)));
  }, [currentLoginUser]);

  const logOutFun = () => {
    if (currentLoginUser === "Admin") {
      dispatch(setFormShow(false));
    } else if (currentLoginUser === "Master") {
      dispatch(setMasterLayoutShow(false));
    } else {
      dispatch(setAgentLayoutShow(false));
    }
  };

  const handleNavige = (key) => {
    navigate(key);
  };

  return (
    <aside
      className={styles.admin_aside}
      style={{ width: collapsed ? "80px" : "280px" }}
    >
      <Menu
        onClick={({ label, key }) => handleNavige(key)}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={data}
      />

      {collapsed ? (
        <div className={styles.log_out_style} onClick={() => logOutFun()}>
          <AiOutlineLogout />
        </div>
      ) : (
        <NormalButton className={styles.logout_btn} onClick={() => logOutFun()}>
          LogOut
        </NormalButton>
      )}
    </aside>
  );
}

export default Sidebar;
