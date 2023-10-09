import { createSlice } from "@reduxjs/toolkit";

const masterData = [
  { id: "mastername", label: "Master Name" },
  { id: "agentId", label: "Agent ID" },
  { id: "password", label: "Password" },
  { id: "comfirmpassword", label: "Comfrim Password" },
  { id: "email", label: "Email" },
  { id: "phoneno", label: "Phone No" },
  { id: "unit", label: "Score (Unit)" },
  { id: "currency", label: "Country" },
];

const userData = [
  { id: "username", label: "User Name" },
  { id: "userId", label: "User ID" },
  { id: "password", label: "Password" },
  { id: "comfirmpassword", label: "Comfrim Password" },
  { id: "email", label: "Email" },
  { id: "phoneno", label: "Phone No" },
  { id: "unit", label: "Score (Unit)" },
  { id: "currency", label: "Country" },
];

const adminData = [
  { id: "name", label: "Name", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "password", label: "Password", type: "password" },
  { id: "role", label: "Role", type: "text" },
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

const initialState = {
  masterCommisionTable: [],
  userTable: [],
  master: masterData,
  commision: commisionData,
  commisionListData: commisionList,
  user: userData,
  admin: adminData,
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

export const { showInputFun, addCommision, addUser } = AllUserPageSlice.actions;

export const masterDatas = (state) => state.userPageData.master;
export const userDatas = (state) => state.userPageData.user;
export const adminDatas = (state) => state.userPageData.admin;
export const commisionDatas = (state) => state.userPageData.commision;
export const commisionListDatas = (state) =>
  state.userPageData.commisionListData;
export const commisionTable = (state) =>
  state.userPageData.masterCommisionTable;

export const userTabledata = (state) => state.userPageData.userTable;

export default AllUserPageSlice.reducer;
