import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  report: true,
  master: true,
  user: true,
  admin: true,
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
  },
});

export const {
  clicked,
  reportFun,
  masterFun,
  userFun,
  adminFun,
} = ShowHideSlice.actions;

export const nestBool = (state) => state.shows.show;
export const reportBool = (state) => state.shows.report;
export const masterBool = (state) => state.shows.master;
export const userBool = (state) => state.shows.user;
export const adminBool = (state) => state.shows.admin;

export default ShowHideSlice.reducer;
