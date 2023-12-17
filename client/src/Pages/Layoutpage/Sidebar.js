import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { useDispatch } from "react-redux";
import { BsFillGridFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
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
import NestSidebar from "./NestSidebar";
import { MdRequestQuote } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { selectcurrentLoginUser, setFormShow } from "../../Feactures/apiSlice";
import { useSelector } from "react-redux";
import NormalButton from "../../Component/NormalButton";

const sData = [
  {
    title: "Dashboard",
    route: "/admin",
    icon: <BsFillGridFill />,
    show: false,
  },
  {
    title: "Unit",
    route: null,
    icon: <BsFillPersonLinesFill />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "Create Unit",
        route: "createunit",
        icon: <BsFillPersonPlusFill />,
      },
      {
        title: "Unit History",
        route: "unithistory",
        icon: <BsFillPersonFill />,
      },
      {
        title: "Unit Transfer History",
        route: "unithistoryTransfer",
        icon: <BsFillPersonFill />,
      },
    ],
  },
  {
    title: "Users",
    route: null,
    icon: <BsPersonCircle />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "All Users",
        route: "allusers",
        icon: <BsPeople />,
      },
      {
        title: "All Agents",
        route: "allagents",
        icon: <BsPeople />,
      },
      {
        title: "All Affiliate Agents",
        route: "allaffiliateagents",
        icon: <BsPeople />,
      },
      {
        title: "All Master",
        route: "allmaster",
        icon: <BsPeople />,
      },
      {
        title: "All Admins",
        route: "alladmins",
        icon: <BsPeople />,
      },
    ],
  },
  {
    title: "Shan Card",
    route: null,
    icon: <GiPokerHand />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "Create Roll",
        route: "create-roll",
        icon: <GiPokerHand />,
      },
      {
        title: "Create Table",
        route: "create-table",
        icon: <GiPokerHand />,
      },
    ],
  },
  {
    title: "Game Setting",
    route: null,
    icon: <AiFillSetting />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "Game Categories",
        route: "game-categories",
        icon: <AiFillSetting />,
      },

      {
        title: "Lottery",
        route: "lotterysetting",
        icon: <BsFillDpadFill />,
      },
    ],
  },
  {
    title: "Lucky Number",
    route: "luckynumber",
    icon: <PiNumberSquareSevenBold />,
    show: false,
  },
  {
    title: "2D-3D Report",
    route: null,
    icon: <BiSolidReport />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "All 2D-3D Report",
        route: "thai2D-12am",
        icon: <BsPeople />,
      },
    ],
  },

  {
    title: "Bank",
    route: null,
    icon: <RiBankCardFill />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "Bank Category",
        route: "bankCategory",
        icon: <BiDollarCircle />,
      },
      {
        title: "Bank Type",
        route: "bankType",
        icon: <BiDollarCircle />,
      },
      {
        title: "Bank Name",
        route: "bankName",
        icon: <BiDollarCircle />,
      },
      {
        title: "Bank Account",
        route: "bankAcc",
        icon: <BiDollarCircle />,
      },
      {
        title: "Bank Rules",
        route: "depositeRule",
        icon: <BiDollarCircle />,
      },
    ],
  },
  {
    title: "Deposite/Withdraw Limit",
    route: "deposite-withdraw-limit",
    icon: <BsFillGridFill />,
    show: false,
  },

  {
    title: "Win/Lose Report",
    route: null,
    icon: <BiSolidReport />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "Master Report",
        route: "master-report",
        icon: <BiSolidReport />,
      },
      {
        title: "User Report",
        route: "user-report",
        icon: <BiSolidReport />,
      },
    ],
  },
  {
    title: "To Deposit",
    route: null,
    icon: <RiLuggageDepositFill />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "To Deposit Request",
        route: "todeposit-request",
        icon: <MdRequestQuote />,
      },
      {
        title: "To Deposit History",
        route: "todeposit-history",
        icon: <ImHistory />,
      },
    ],
  },
  {
    title: "To WithDraw",
    route: null,
    icon: <BiMoneyWithdraw />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "To Withdraw Request",
        route: "towithdraw-request",
        icon: <MdRequestQuote />,
      },
      {
        title: "To Withdraw History",
        route: "towithdraw-history",
        icon: <ImHistory />,
      },
    ],
  },
];

const masterData = [
  {
    title: "Master Dashboard",
    route: "/master",
    icon: <BsFillGridFill />,
    show: false,
  },
  {
    title: "Users",
    route: null,
    icon: <BsPersonCircle />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "All Agents",
        route: "down_line_agent",
        icon: <BsPeople />,
      },
    ],
  },
  {
    title: "Bank",
    route: null,
    icon: <RiBankCardFill />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "BankAccount",
        route: "bankAcc",
        icon: <BiDollarCircle />,
      },
    ],
  },
  {
    title: "Win/Lose Report",
    route: null,
    icon: <BiSolidReport />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "Master Report",
        route: "master-report",
        icon: <BiSolidReport />,
      },
      {
        title: "User Report",
        route: "user-report",
        icon: <BiSolidReport />,
      },
    ],
  },
  {
    title: "To Deposit",
    route: "todeposit",
    icon: <RiLuggageDepositFill />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "To Deposit Request",
        route: "todeposit-request",
        icon: <MdRequestQuote />,
      },
      {
        title: "To Deposit History",
        route: "todeposit-history",
        icon: <ImHistory />,
      },
    ],
  },

  {
    title: "To WithDraw",
    route: "towithdraw",
    icon: <BiMoneyWithdraw />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "To Withdraw Request",
        route: "towithdraw-request",
        icon: <MdRequestQuote />,
      },
      {
        title: "To Withdraw History",
        route: "towithdraw-history",
        icon: <ImHistory />,
      },
    ],
  },
];

const agentData = [
  {
    title: "Agent Dashboard",
    route: "/agent",
    icon: <BsFillGridFill />,
    show: false,
  },
  {
    title: "Unit",
    route: null,
    icon: <BsFillPersonLinesFill />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "Unit Transfer History",
        route: "unithistoryTransfer",
        icon: <BsFillPersonFill />,
      },
    ],
  },
  {
    title: "Users",
    route: null,
    icon: <BsPersonCircle />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "All Users",
        route: "down_line_user",
        icon: <BsPeople />,
      },
    ],
  },
  {
    title: "Bank",
    route: null,
    icon: <RiBankCardFill />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "Bank Account",
        route: "bankAcc",
        icon: <BiDollarCircle />,
      },
    ],
  },
  {
    title: "Win/Lose Report",
    route: null,
    icon: <BiSolidReport />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "User Report",
        route: "user-report",
        icon: <BiSolidReport />,
      },
    ],
  },
  {
    title: "To Deposit",
    route: "todeposit",
    icon: <RiLuggageDepositFill />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "To Deposit Request",
        route: "todeposit-request",
        icon: <MdRequestQuote />,
      },
      {
        title: "To Deposit History",
        route: "todeposit-history",
        icon: <ImHistory />,
      },
    ],
  },

  {
    title: "To WithDraw",
    route: "towithdraw",
    icon: <BiMoneyWithdraw />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "To Withdraw Request",
        route: "towithdraw-request",
        icon: <MdRequestQuote />,
      },
      {
        title: "To Withdraw History",
        route: "towithdraw-history",
        icon: <ImHistory />,
      },
    ],
  },
];

function Sidebar() {
  const currentLoginUser = useSelector(selectcurrentLoginUser);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(setFormShow(false));
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    currentLoginUser !== "" &&
      ((currentLoginUser === "Admin" && setData(sData)) ||
        (currentLoginUser === "Master" && setData(masterData)) ||
        (currentLoginUser === "Agent" && setData(agentData)));
  }, [currentLoginUser]);

  const dropDown = (item) => {
    const perfect = data.map((d) =>
      d.title === item ? { ...d, show: !d.show } : d
    );
    setData(perfect);
  };

  return (
    <aside className={styles.admin_aside}>
      <ul className={styles.sidebar_main}>
        {data.map((d) => (
          <li key={d.title}>
            <div className={styles.sidebarItem}>
              <span>{d.icon}</span>
              <span className={styles.sidebarTitle}>
                {d.route ? <NavLink to={d.route}>{d.title}</NavLink> : d.title}
              </span>
              {d.iconRight ? (
                <span
                  className={styles.rightArrow}
                  onClick={() => dropDown(d.title)}
                >
                  {d.show ? <BsChevronDown /> : d.iconRight}
                </span>
              ) : null}
            </div>
            {d.subNav ? (
              <ul
                className={d.show ? styles.dropDownOpen : styles.dropDownHide}
              >
                <NestSidebar subNav={d.subNav} />
              </ul>
            ) : null}
          </li>
        ))}

        <li>
          <NormalButton
            onClick={logOut}
            className={`btn ${styles.log_out_btn}`}
          >
            Log Out
          </NormalButton>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
