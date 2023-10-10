import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchData,
  postDatas,
  patchDatas,
  fetchDataWithToken,
} from "../app/api";

export const fetGetAllTwoDNo = createAsyncThunk(
  "data/fetGetAllTwoDNo",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetchPatchTwoDsetting = createAsyncThunk(
  "data/fetchPatchTwoDsetting",
  async ({ api, patchData, accessToken }) => {
    const data = await patchDatas(api, patchData, accessToken);
    return data;
  }
);

const initialState = {
  allTwoDNo: {},
  allTwoDNoStatus: "idle",
  allTwoDNoError: null,
  twoDsetting: {},
  twoDsettingStatus: "idle",
  twoDsettingError: null,
};
const twoDapiSlice = createSlice({
  name: "twoDapi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get all 2d no uisng get mehtod
      .addCase(fetGetAllTwoDNo.pending, (state) => {
        state.allTwoDNoStatus = "loading";
      })
      .addCase(fetGetAllTwoDNo.fulfilled, (state, action) => {
        state.allTwoDNoStatus = "succeeded";
        state.allTwoDNo = action.payload;
      })
      .addCase(fetGetAllTwoDNo.rejected, (state, action) => {
        state.allTwoDNoStatus = "failed";
        state.allTwoDNoError = action.error.message;
      })

      //patch 2d setting no uisng get mehtod
      .addCase(fetchPatchTwoDsetting.pending, (state) => {
        state.twoDsettingStatus = "loading";
      })
      .addCase(fetchPatchTwoDsetting.fulfilled, (state, action) => {
        state.twoDsettingStatus = "succeeded";
        state.twoDsetting = action.payload;
        console.log(state.twoDsetting);
      })
      .addCase(fetchPatchTwoDsetting.rejected, (state, action) => {
        state.twoDsettingStatus = "failed";
        state.twoDsettingError = action.error.message;
        console.log(state.twoDsettingError);
      });
  },
});

export const selectAllTwoDNo = (state) => state.twoDapi.allTwoDNo;
export const selectAllTwoDNoStatue = (state) => state.twoDapi.allTwoDNoStatus;

export const selectTwoDsettingStatus = (state) =>
  state.twoDapi.twoDsettingStatus;

export default twoDapiSlice.reducer;
