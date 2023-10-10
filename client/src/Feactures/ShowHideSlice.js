import { createSlice } from "@reduxjs/toolkit";

const searchQuery = { unitHistoryQuery: "", allUserQuery: "", twoDQuery: "" };

const initialState = {
  show: false,
  report: true,
  master: true,
  user: true,
  admin: true,
  searchQuery,
};

const ShowHideSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    clicked: (state) => {
      state.show = !state.show;
    },

    // for report 2d page state
    reportFun: (state, action) => {
      state.report = action.payload.bool;
    },

    //for master page state
    masterFun: (state) => {
      state.master = !state.master;
    },

    //for user form show
    userFun: (state) => {
      state.user = !state.user;
    },

    //for create admin form show
    adminFun: (state) => {
      state.admin = !state.admin;
    },

    //search Bar state
    setUnitHistoryQuery: (state, action) => {
      state.searchQuery.unitHistoryQuery = action.payload;
    },

    setAllUserQuery: (state, action) => {
      state.searchQuery.allUserQuery = action.payload;
    },

    setTwoDQuery: (state, action) => {
      state.searchQuery.twoDQuery = action.payload;
    },
  },
});

export const {
  clicked,
  reportFun,
  masterFun,
  userFun,
  adminFun,
  setAllUserQuery,
  setUnitHistoryQuery,
  setTwoDQuery,
} = ShowHideSlice.actions;

export const nestBool = (state) => state.shows.show;
export const reportBool = (state) => state.shows.report;
export const masterBool = (state) => state.shows.master;
export const userBool = (state) => state.shows.user;
export const adminBool = (state) => state.shows.admin;

//serachbar state
export const selectAllUserQuery = (state) =>
  state.shows.searchQuery.allUserQuery;

export const selectUnitHistoryQuery = (state) =>
  state.shows.searchQuery.unitHistoryQuery;

export const selectTwoDQuery = (state) => state.shows.searchQuery.twoDQuery;

export default ShowHideSlice.reducer;
