import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDataSlot } from "../app/api";

export const fetchSlotAllUser = createAsyncThunk(
  "data/fetchSlotAllUser",
  async (api) => {
    const data = await fetchDataSlot(api);
    return data;
  }
);

export const fetchSlotUserDetail = createAsyncThunk(
  "data/fetchSlotUserDetail",
  async (api) => {
    const data = await fetchDataSlot(api);
    return data;
  }
);

const initialState = {
  userAll: null,
  userAllStatus: "idle",
  userAllError: null,

  userDetailSlot: null,
  userDetailSlotStatus: "idle",
  userDetailSlotError: null,

  startDate: "today",
  endDate: "",
  slotUserId: "",
};

const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //for patch main unit  get method store logInData [] arr
      .addCase(fetchSlotAllUser.pending, (state) => {
        state.userAllStatus = "loading";
      })
      .addCase(fetchSlotAllUser.fulfilled, (state, action) => {
        state.userAllStatus = "succeeded";
        state.userAll = action.payload;
        console.log(state.userAll);
      })
      .addCase(fetchSlotAllUser.rejected, (state, action) => {
        state.userAllStatus = "failed";
        state.userAllError = action.error.message;
      })

      //user Detail

      .addCase(fetchSlotUserDetail.pending, (state) => {
        state.userDetailSlotStatus = "loading";
      })
      .addCase(fetchSlotUserDetail.fulfilled, (state, action) => {
        state.userDetailSlotStatus = "succeeded";
        state.userDetailSlot = action.payload;
      })
      .addCase(fetchSlotUserDetail.rejected, (state, action) => {
        state.userDetailSlotStatus = "failed";
        state.userDetailSlotError = action.error.message;
      });
  },
});

export const selectUserAll = (state) => state.slot.userAll;
export const selectUserAllStatus = (state) => state.slot.userAllStatus;
export const selectStartDate = (state) => state.slot.startDate;

export const selectUserDetailSlot = (state) => state.slot.userDetailSlot;
export const selectUserDetailSlotStatus = (state) =>
  state.slot.userDetailSlotStatus;

export default slotSlice.reducer;
