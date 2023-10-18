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

export const fetchGetLotterySetting = createAsyncThunk(
  "data/fetGetLotterySetting",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetchPatchLotterySetting = createAsyncThunk(
  "data/fetchPatchLotterySetting",
  async ({ api, patchData, accessToken }) => {
    const data = await patchDatas(api, patchData, accessToken);
    return data;
  }
);

export const fetGetGameCat = createAsyncThunk(
  "data/fetGetGameCat",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetSubGameCat = createAsyncThunk(
  "data/fetGetSubGameCat",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

const initialState = {
  allTwoDNo: {},
  allTwoDNoStatus: "idle",
  allTwoDNoError: null,
  patchLotterySetting: {},
  patchLotterySettingError: null,
  patchLotterySettingStatus: "idle",
  getLotterySetting: null,
  getLotterySettingStatus: "idle",
  getLotterySettingError: null,
  getGameCat: null,
  getGameCatStatus: "idle",
  getGameCatError: null,
  getSupGameCat: null,
  getSupGameCatStatus: "idle",
  getSupGameCatError: null,
  clickSubName: "",
  fliterSupGameArr: [],
};
const twoDapiSlice = createSlice({
  name: "twoDapi",
  initialState,
  reducers: {
    closeGameCat: (state, action) => {
      state.getGameCat.data.allGameCategory =
        state.getGameCat.data.allGameCategory.map((d) =>
          d.cat_name === action.payload ? { ...d, status: !d.status } : d
        );
    },

    setClickSubName: (state, action) => {
      state.clickSubName = action.payload;
    },

    setFilterSupGameArr: (state, action) => {
      state.fliterSupGameArr = state.getSupGameCat.data.allSubGameCat.filter(
        (d) => d.catName_id === action.payload.id
      );
    },

    closeSupGameCat: (state, action) => {
      state.fliterSupGameArr = state.fliterSupGameArr.map((d) =>
        d._id === action.payload ? { ...d, status: !d.status } : d
      );

      console.log(state.fliterSupGameArr);
    },
  },
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

      //patch  slottery setting no uisng get mehtod
      .addCase(fetchPatchLotterySetting.pending, (state) => {
        state.patchLotterySettingStatus = "loading";
      })
      .addCase(fetchPatchLotterySetting.fulfilled, (state, action) => {
        state.patchLotterySettingStatus = "succeeded";
        state.patchLotterySetting = action.payload;
        console.log(state.patchLotterySetting);
      })
      .addCase(fetchPatchLotterySetting.rejected, (state, action) => {
        state.patchLotterySettingStatus = "failed";
        state.patchLotterySettingError = action.error.message;
        console.log(state.patchLotterySettingError);
      })

      //patch  slottery setting no uisng get mehtod
      .addCase(fetchGetLotterySetting.pending, (state) => {
        state.getLotterySettingStatus = "loading";
      })
      .addCase(fetchGetLotterySetting.fulfilled, (state, action) => {
        state.getLotterySettingStatus = "succeeded";
        state.getLotterySetting = action.payload;
        console.log(state.getLotterySetting);
      })
      .addCase(fetchGetLotterySetting.rejected, (state, action) => {
        state.getLotterySettingStatus = "failed";
        state.getLotterySettingError = action.error.message;
      })
      //get game category n fetGetSubGameCat
      .addCase(fetGetGameCat.pending, (state) => {
        state.getGameCatStatus = "loading";
      })
      .addCase(fetGetGameCat.fulfilled, (state, action) => {
        state.getGameCatStatus = "succeeded";
        state.getGameCat = action.payload;
      })
      .addCase(fetGetGameCat.rejected, (state, action) => {
        state.getGameCatStatus = "failed";
        state.getGameCatError = action.error.message;
      })
      //get game category n
      .addCase(fetGetSubGameCat.pending, (state) => {
        state.getSupGameCatStatus = "loading";
      })
      .addCase(fetGetSubGameCat.fulfilled, (state, action) => {
        state.getSupGameCatStatus = "succeeded";
        state.getSupGameCat = action.payload;
      })
      .addCase(fetGetSubGameCat.rejected, (state, action) => {
        state.getSupGameCatStatus = "failed";
        state.getSupGameCatError = action.error.message;
      });
  },
});

export const {
  closeGameCat,
  closeSupGameCat,
  setClickSubName,
  setFilterSupGameArr,
} = twoDapiSlice.actions;

export const selectAllTwoDNo = (state) => state.twoDapi.allTwoDNo;
export const selectAllTwoDNoStatue = (state) => state.twoDapi.allTwoDNoStatus;

export const selectGetLotterySetting = (state) =>
  state.twoDapi.getLotterySetting;
export const selectGetLotterySettingStatus = (state) =>
  state.twoDapi.getLotterySettingStatus;

export const selectPatchLotterySettingStatus = (state) =>
  state.twoDapi.patchLotterySettingStatus;

export const selectPatchLotterySetting = (state) =>
  state.twoDapi.patchLotterySetting;

export const selectGameCat = (state) => state.twoDapi.getGameCat;
export const selectSubGameCat = (state) => state.twoDapi.getSupGameCat;
export const selectGameCatStatus = (state) => state.twoDapi.getGameCatStatus;
export const selectSubGameStatus = (state) => state.twoDapi.getSupGameCatStatus;
export const selectClickSubName = (state) => state.twoDapi.clickSubName;

export const selectFilterSubGameArr = (state) => state.twoDapi.fliterSupGameArr;

export default twoDapiSlice.reducer;
