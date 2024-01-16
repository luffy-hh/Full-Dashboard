import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDataSlot } from "../app/api";

export const fetchSlotAllUser = createAsyncThunk(
  "data/fetchSlotAllUser",
  async ({ api, accessToken }) => {
    const data = await fetchDataSlot(api, accessToken);
    return data;
  }
);

export const fetchSlotUserDetail = createAsyncThunk(
  "data/fetchSlotUserDetail",
  async ({ api, accessToken }) => {
    const data = await fetchDataSlot(api, accessToken);
    return data;
  }
);

export const fetchSlotUserRecord = createAsyncThunk(
  "data/fetchSlotUserRecord",
  async ({ api, accessToken }) => {
    const data = await fetchDataSlot(api, accessToken);
    return data;
  }
);

const initialState = {
  gameData: {},
  userAll: null,
  userAllStatus: "idle",
  userAllError: null,

  userDetailSlot: null,
  userDetailSlotStatus: "idle",
  userDetailSlotError: null,

  userRecordSlot: null,
  userRecordSlotStatus: "idle",
  userRecordSlotError: null,
};

const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {
    setGameData: (state, action) => {
      state.gameData = action.payload;
    },
  },
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
      })

      //user Record

      .addCase(fetchSlotUserRecord.pending, (state) => {
        state.userRecordSlotStatus = "loading";
      })
      .addCase(fetchSlotUserRecord.fulfilled, (state, action) => {
        state.userRecordSlotStatus = "succeeded";
        state.userRecordSlot = action.payload;
      })
      .addCase(fetchSlotUserRecord.rejected, (state, action) => {
        state.userRecordSlotStatus = "failed";
        state.userRecordSlotError = action.error.message;
      });
  },
});

export const { setGameData } = slotSlice.actions;

//data=====
export const selectGameData = (state) => state.slot.gameData;

export const selectUserAll = (state) => state.slot.userAll;
export const selectUserAllStatus = (state) => state.slot.userAllStatus;
export const selectStartDate = (state) => state.slot.startDate;

export const selectUserDetailSlot = (state) => state.slot.userDetailSlot;
export const selectUserDetailSlotStatus = (state) =>
  state.slot.userDetailSlotStatus;

export const selectUserRecordSlot = (state) => state.slot.userRecordSlot;
export const selectUserRecordSlotStatus = (state) =>
  state.slot.userRecordSlotStatus;

export default slotSlice.reducer;
