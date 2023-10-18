import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const twodHead = [
  { text: "ထိပ်စီးနံပါတ်ဂဏန်း", active: false, id: 1 },
  { text: "တစ်လုံးချင်းပိတ်", active: false, id: 2 },
  { text: "General", active: false, id: 3 },
];

const twoDReportHead = [
  { text: "Table 1", active: true, id: 1 },
  { text: "Table 2", active: false, id: 2 },
  { text: "Table 3", active: false, id: 3 },
];

const table1Data = [
  {
    no: "No",
    twoD: "2D",
    bet: "No of Bet",
    success: "Amount of Success",
    profit: "Porfit/Loss",
  },
];

const table1ExpData = [
  { no: 0, twoD: 0, bet: 0, success: 0, profit: 0 },
  { no: 0, twoD: 0, bet: 0, success: 0, profit: 0 },
];

const table3ExpData = [
  {
    name: "gggwp",
    amount: 3444,
    totallBet: 4333,
    winAmount: 344,
    top: 233,
    profit: 45555,
  },
  {
    name: "hahah",
    amount: 3444,
    totallBet: 4333,
    winAmount: 344,
    top: 233,
    profit: 45555,
  },
];

const optionLucky = [
  "Choose 2D Categories",
  "Thai 2D morning",
  "Thai 2D evening",
  "Dubai 2D morning",
  "Thai 3D half month",
];

const allTwodData = { twodHead };
const initialState = {
  allTwodData,
  twoDReportHead,
  table1Data,
  table1ExpData,
  table3ExpData,
  optionLucky,
  lukyCate: "",
  lukyNo: null,
};

const adminTwodSlice = createSlice({
  name: "adminTwoD",
  initialState,
  reducers: {
    adminTwoDColor: (state, action) => {
      state.allTwodData.twodHead = state.allTwodData.twodHead.map((s) =>
        s.id === action.payload.id
          ? { ...s, active: true }
          : { ...s, active: false }
      );
    },

    changeTwoDReportHade: (state, action) => {
      state.twoDReportHead = state.twoDReportHead.map((s) =>
        s.id === action.payload.id
          ? { ...s, active: true }
          : { ...s, active: false }
      );
    },

    setLuckyCate: (state, action) => {
      state.lukyCate = action.payload;
    },

    setLuckyNo: (state, action) => {
      state.lukyNo = action.payload;
    },
  },
});

export const {
  adminTwoDColor,
  changeTwoDReportHade,
  setLuckyCate,
  setLuckyNo,
} = adminTwodSlice.actions;

export const selectTwoDHead = (state) => state.adminTwoD.allTwodData.twodHead;
export const selectTwoDReportHead = (state) => state.adminTwoD.twoDReportHead;
export const showTable1 = (state) => state.adminTwoD.twoDReportHead[0].active;
export const showTable2 = (state) => state.adminTwoD.twoDReportHead[1].active;
export const showTable3 = (state) => state.adminTwoD.twoDReportHead[2].active;
export const selectTable1Data = (state) => state.adminTwoD.table1Data;
export const selectTable3ExpData = (state) => state.adminTwoD.table3ExpData;
export const selecttable1ExpData = (state) => state.adminTwoD.table1ExpData;
export const selectOptionLucky = (state) => state.adminTwoD.optionLucky;
export const selectLuckyCate = (state) => state.adminTwoD.lukyCate;
export const selectLuckyNo = (state) => state.adminTwoD.lukyNo;

export default adminTwodSlice.reducer;

//klkljj
