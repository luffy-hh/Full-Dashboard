import { createSlice } from "@reduxjs/toolkit";

const masterData = [
  { id: "mastername", label: "Master Name", state: 1 },
  { id: "email", label: "Email", state: 5 },
  { id: "Master", label: "Role", state: 2 },
  { id: "password", label: "Password", state: 3 },
  { id: "comfirmpassword", label: "Comfrim Password", state: 4 },
];

const userDetailCom = [
  { com: "20%", za: "20", name: "MgMa" },
  { com: "30%", za: "20", name: "Hla Hla" },
];

const userDetailComHead = [
  "Agent List",
  "Commasion",
  "MainCompensation",
  "Edit",
];

const agentData = [
  { id: "agentname", label: "Agent Name", state: 1 },
  { id: "email", label: "Email", state: 5 },
  { id: "Agent", label: "Role", state: 2 },
  { id: "password", label: "Password", state: 3 },
  { id: "comfirmpassword", label: "Comfrim Password", state: 4 },
];

const userData = [
  { id: "username", label: "User Name", state: 1 },
  { id: "email", label: "Email", state: 5 },
  { id: "User", label: "Role", state: 2 },
  { id: "password", label: "Password", state: 3 },
  { id: "comfirmpassword", label: "Comfrim Password", state: 4 },
];

const adminData = [
  { id: "name", label: "Name", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "password", label: "Password", type: "password" },
  { id: "Admin", label: "Role", type: "text" },
];

const commisionData = [
  { title: "Slot", active: false },
  { title: "Fishing", active: false },
  { title: "LiveCasino", active: false },
];

const commisionList = [
  { title: "2D" },
  { title: "3D" },
  { title: "body" },
  { title: "Maung" },
];

const todepositHead = [
  "No",
  "Type",
  "Summit Time",
  "Amount",
  "Status",
  "Status Time",
  "Description",
];
const todeposit = [
  {
    type: "Deposite",
    sumitTime: "10/11/2020",
    amount: 50000,
    status: "Approved",
    statusTime: "10/11/2020",
    description: "Ok",
  },
  {
    type: "Withdraw",
    sumitTime: "10/11/2020",
    amount: 10000,
    status: "Rejected",
    statusTime: "10/11/2020",
    description: "Noooo",
  },
];

const payMentMethod = [
  {
    show: true,
    method: "All Methods",
    pay: ["AYA", "KBZ", "CB", "KPay", "CBPay", "WavePay", "AYAPay"],
  },
  { show: false, method: "Banks", pay: ["AYA", "KBZ", "CB"] },
  {
    show: false,
    method: "Online Banking",
    pay: ["KPay", "CBPay", "WavePay", "AYAPay"],
  },
];
const initialState = {
  masterCommisionTable: [],
  userTable: [],
  master: masterData,
  commision: commisionData,
  commisionListData: commisionList,
  user: userData,
  admin: adminData,
  agent: agentData,
  userDetailCom,
  userDetailComHead,
  todeposit,
  todepositHead,
  payMentMethod,
};

const AllUserPageSlice = createSlice({
  name: "userPageData",
  initialState,
  reducers: {
    //for commision data function========
    showInputFun: (state, action) => {
      state.commision = state.commision.map((c) =>
        c.title === action.payload.title ? { ...c, active: !c.active } : c
      );
    },

    addCommision: (state, action) => {
      state.masterCommisionTable.push(action.payload);
    },

    //for user add table
    addUser: (state, action) => {
      state.userTable.push(action.payload);
    },

    changeActive: (state, action) => {
      state.payMentMethod = state.payMentMethod.map((d) =>
        d.method === action.payload
          ? { ...d, show: true }
          : { ...d, show: false }
      );
    },
  },
});

export const { showInputFun, addCommision, addUser, changeActive } =
  AllUserPageSlice.actions;

export const masterDatas = (state) => state.userPageData.master;
export const userDatas = (state) => state.userPageData.user;
export const selectAgentData = (state) => state.userPageData.agent;
export const adminDatas = (state) => state.userPageData.admin;
export const commisionDatas = (state) => state.userPageData.commision;
export const commisionListDatas = (state) =>
  state.userPageData.commisionListData;
export const commisionTable = (state) =>
  state.userPageData.masterCommisionTable;

export const userTabledata = (state) => state.userPageData.userTable;

export const selectUserDetailCom = (state) => state.userPageData.userDetailCom;
export const selectUserDetailComHead = (state) =>
  state.userPageData.userDetailComHead;

export const selectToDeposit = (state) => state.userPageData.todeposit;
export const selectToDepositHead = (state) => state.userPageData.todepositHead;

export const selectPayMentMethod = (state) => state.userPageData.payMentMethod;

export default AllUserPageSlice.reducer;
