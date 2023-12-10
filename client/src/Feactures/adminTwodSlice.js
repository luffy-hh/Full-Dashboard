import { createSlice } from "@reduxjs/toolkit";

const twodHead = [
  { text: "ထိပ်စီးနံပါတ်ဂဏန်း", active: false, id: 1 },
  { text: "တစ်လုံးချင်းပိတ်", active: false, id: 2 },
  { text: "General", active: false, id: 3 },
];

const luckyNoHead = ["No", "2D Number", "Category", "Status", "Date"];
const threeDLuckyNoHead = ["No", "3D Number", "Category", "Status", "Date"];

const twoDReportHead = [
  { text: "Table 1", active: true, id: 1 },
  { text: "Table 2", active: false, id: 2 },
  { text: "Table 3", active: false, id: 3 },
];

const table1Data = [
  "No",
  "2D",
  "No of Bet",
  "Total Amount",
  "Amount of Success",
  "Porfit/Loss",
];

const table3Data = [
  "No",
  "ထိုးသားစာရင်း",
  "အကြိမ်အရေအတွက်",
  "ထိုးသည့်ပမာဏစုစုပေါင်း",
  "နိုင်သည့်ပမာဏ",
  "ဂုတ်စီး",
  "အရှုံးအမြတ်",
];

const allTwodData = { twodHead };

const initialState = {
  allTwodData,
  twoDReportHead,
  table1Data,
  table3Data,
  luckyNoHead,
  threeDLuckyNoHead,

  lukyCate: "",
  lukyNo: "",
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
export const selectTable3Data = (state) => state.adminTwoD.table3Data;
export const selectLuckyCate = (state) => state.adminTwoD.lukyCate;
export const selectLuckyNo = (state) => state.adminTwoD.lukyNo;

export const selectLuckyNoHead = (state) => state.adminTwoD.luckyNoHead;
export const selectThreeDLuckyNoHead = (state) =>
  state.adminTwoD.threeDLuckyNoHead;

export default adminTwodSlice.reducer;

//klkljj
