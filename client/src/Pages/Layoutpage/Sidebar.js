import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { BsFillGridFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
import { BsLifePreserver } from "react-icons/bs";
import { BsFillDiscFill } from "react-icons/bs";
import { BsFillDice5Fill } from "react-icons/bs";
import { BsFillDpadFill } from "react-icons/bs";
import { CgGames } from "react-icons/cg";
import { BsCardImage } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { PiNumberSquareSevenBold } from "react-icons/pi";
import { RiBankCardFill } from "react-icons/ri";
import { BiDollarCircle } from "react-icons/bi";
import { BiSolidReport } from "react-icons/bi";
import NestSidebar from "./NestSidebar";
import { NavLink } from "react-router-dom";
import { selectcurrentLoginUser } from "../../Feactures/apiSlice";
import { useSelector } from "react-redux";

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
        title: "Unit History Transfer",
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
    title: "Games",
    route: null,
    icon: <CgGames />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "Slot",
        route: "slot",
        icon: <BsFillDiscFill />,
      },
      {
        title: "Casino",
        route: "casino",
        icon: <BsFillDice5Fill />,
      },
      {
        title: "Lottery",
        route: "lottery",
        icon: <BsFillDpadFill />,
      },
      {
        title: "Sport",
        route: "sport",
        icon: <BsLifePreserver />,
      },
      {
        title: "Card",
        route: "card",
        icon: <BsCardImage />,
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
        iconRight: <BsChevronRight />,
        show: false,
        tribleNav: [
          {
            title: "2D",
            route: "lottery2d",
          },
          {
            title: "3D",
            route: "lottery3d",
          },
        ],
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
    title: "Bank Account",
    route: null,
    icon: <RiBankCardFill />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "TypesOfDeposite",
        route: "typesOfDeposite",
        icon: <BiDollarCircle />,
      },
      {
        title: "DifferentOfDeposite",
        route: "differentOfDeposite",
        icon: <BiDollarCircle />,
      },
      {
        title: "DepositeAccount",
        route: "depositeAcc",
        icon: <BiDollarCircle />,
      },
      {
        title: "DepositeRule",
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
    title: "2D Report",
    route: null,
    icon: <BiSolidReport />,
    iconRight: <BsChevronRight />,
    show: false,
    subNav: [
      {
        title: "Thai 2D 12am",
        route: "thai2D-12am",
        icon: <BsPeople />,
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
];

function Sidebar() {
  const currentLoginUser = useSelector(selectcurrentLoginUser);

  const [data, setData] = useState([]);
  useEffect(() => {
    currentLoginUser !== "" &&
      ((currentLoginUser === "Admin" && setData(sData)) ||
        (currentLoginUser === "Master" && setData(masterData)));
  }, [currentLoginUser]);

  const dropDown = (item) => {
    const perfect = data.map((d) =>
      d.title === item ? { ...d, show: !d.show } : d
    );
    setData(perfect);
  };

  return (
    <aside>
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
      </ul>
    </aside>
  );
}

export default Sidebar;
