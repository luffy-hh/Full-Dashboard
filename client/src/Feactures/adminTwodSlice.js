import { createSlice } from "@reduxjs/toolkit";

const twodHead = [
  { text: "ထိပ်စီးနံပါတ်ဂဏန်း", active: false, id: 1 },
  { text: "တစ်လုံးချင်းပိတ်", active: false, id: 2 },
  { text: "အချိန်", active: false, id: 3 },
  { text: "နစ်လုံးထီ အလျော် (ဇ)", active: false, id: 4 },
];

const allTwodData = { twodHead };
const initialState = { allTwodData };

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
  },
});

export const { adminTwoDColor } = adminTwodSlice.actions;

export const selectTwoDHead = (state) => state.adminTwoD.allTwodData.twodHead;

export default adminTwodSlice.reducer;
