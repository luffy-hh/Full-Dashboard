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

const todepositHeadReq = [
  "No",
  "Amount",
  "Summit Acc ID",
  "Bank Name",
  "Receiver Name",
  "Receiver Account",
  "Transition ID",
  "From Account",
  "Status",
  "Action",
  "User Summit Time",
];

const todepositHeadHistory = [
  "No",
  "Amount",
  "Summit Acc ID",
  "Bank Name",
  "Receiver Name",
  "Receiver Account",
  "Transition ID",
  "From Account",
  "Status",
  "Action Time",
];

//this is for withdraw history
const toWithdrawHead = [
  "No",
  "Amount",
  "Summit Acc ID",
  "Bank Name",
  "Receiver Name",
  "Receiver Account",
  "Status",
  "User Summit Time",
];

//this is for withdrawl requst
const toWithdrawHeadRequset = [
  "No",
  "Amount",
  "Summit Acc ID",
  "Bank Name",
  "Receiver Name",
  "Receiver Account",
  "Status",
  "Action",
  "User Summit Time",
];

const bankCatHead = ["No", "Bank Categories", "Action"];

const bankTypeHead = ["No", "Banking Type", "Action"];

const bankNameHead = ["No", "Banking Type", "Bank Name", "Logo", "Action"];

const bankAccHead = [
  "No",
  "Bank Name",
  "Account Name",
  "Account No",
  "Logo",
  "Description",
  "Action",
];

const upLineOrDownLine = [
  { text: "UpLine", id: 1, from: "From DownLine" },
  { text: "DownLine", id: 2, from: "From UpLine" },
];

const todepositHistoryHead = [
  "No",
  "Amount",
  "Summit Acc",
  "Banking Type",
  "Payment Type",
  "Receiver Account",
  "Transition ID",
  "From Account",
  "Status",
  "Photo Link",
  "Summit Time",
  "Action Time",
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
  todepositHistoryHead,
  todepositHeadReq,
  bankCatHead,
  bankTypeHead,
  bankNameHead,
  bankAccHead,
  toWithdrawHead,
  toWithdrawHeadRequset,
  upLineOrDownLine,
  todepositHeadHistory,
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

export const selectToDepositHeadReq = (state) =>
  state.userPageData.todepositHeadReq;
export const selectTodepositHistoryHead = (state) =>
  state.userPageData.todepositHistoryHead;

export const selectToWithdrawHead = (state) =>
  state.userPageData.toWithdrawHead;
export const selectToWithdrawHeadRequset = (state) =>
  state.userPageData.toWithdrawHeadRequset;

export const selectBankCatHead = (state) => state.userPageData.bankCatHead;
export const selectBankTypeHead = (state) => state.userPageData.bankTypeHead;
export const selectBankNameHead = (state) => state.userPageData.bankNameHead;
export const selectBankAccHead = (state) => state.userPageData.bankAccHead;
export const selectUpLineOrDownLine = (state) =>
  state.userPageData.upLineOrDownLine;

export const selectTodepositHeadHistory = (state) =>
  state.userPageData.todepositHeadHistory;

export default AllUserPageSlice.reducer;
