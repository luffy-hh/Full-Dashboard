import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchData,
  postDataWithToken,
  patchDatas,
  fetchDataWithToken,
} from "../app/api";

import allTwoDNumber from "../asset/2d.json";
console.log(allTwoDNumber);

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

export const fetchFilterPatchLotterySetting = createAsyncThunk(
  "data/fetchFilterPatchLotterySetting",
  async ({ api, patchData, accessToken }) => {
    const data = await patchDatas(api, patchData, accessToken);
    return data;
  }
);

export const fetGetLuckyNoHistory = createAsyncThunk(
  "data/fetGetLuckyNoHistory",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetLuckNo = createAsyncThunk(
  "data/fetGetLuckNo",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetLuckyWinner = createAsyncThunk(
  "data/fetGetLuckyWinner",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const postLuckyNo = createAsyncThunk(
  "data/postLuckyNo",
  async ({ api, postData, accessToken }) => {
    const data = await postDataWithToken(api, postData, accessToken);
    console.log(data);
    return data;
  }
);

export const fetPatchCloseNo = createAsyncThunk(
  "data/fetPatchCloseNo",
  async ({ api, patchData, accessToken }) => {
    const data = await patchDatas(api, patchData, accessToken);
    return data;
  }
);

export const fetPatchMasterGameCat = createAsyncThunk(
  "data/fetPatchMasterGameCat",
  async ({ api, patchData, accessToken }) => {
    const data = await patchDatas(api, patchData, accessToken);
    return data;
  }
);

export const fetPatchMasterSubGameCat = createAsyncThunk(
  "data/fetPatchMasterSubGameCat",
  async ({ api, patchData, accessToken }) => {
    const data = await patchDatas(api, patchData, accessToken);
    return data;
  }
);

const initialState = {
  allTwoDNumber,
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
  filterEditGame: {},
  filterEditGameStatus: "idle",
  filterEditGameError: null,
  allTwoDArr: [],
  filterTwoDArr: [], //this is dymanic this array will be 3d or 2d depending on ID
  luckyNo: null,
  luckyNoStatus: "idle",
  luckyNoError: null,

  luckyNoData: null,
  luckyNoDataStatus: "idle",
  luckyNoDataError: null,

  luckyWinner: null,
  luckyWinnerStatus: "idle",
  luckyWinnerError: null,

  postLuckyNoData: {},
  postLuckyNoDataStatus: "idle",
  postLuckyNoDataError: null,

  patchCloseNo: {},
  patchCloseNoStatus: "idle",
  patchCloseNoError: null,
  patchMasterGameCat: {},
  patchMasterGameCatStatus: "idle",
  patchMasterGameCatError: null,

  patchMasterSubGameCat: {},
  patchMasterSubGameCatStatus: "idle",
  patchMasterSubGameCatError: null,

  twoDReportHistory: null,
  twoDTable1History: null,
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

    setFilterTwoDArr: (state, action) => {
      state.filterTwoDArr = state.getSupGameCat.data.allSubGameCat.filter(
        (d) => d.catName_id === action.payload.id
      );

      console.log("filter", state.filterTwoDArr);
    },

    closeSupGameCat: (state, action) => {
      state.fliterSupGameArr = state.fliterSupGameArr.map((d) =>
        d._id === action.payload ? { ...d, status: !d.status } : d
      );
    },

    setFilterTwoDReportHistroy: (state, action) => {
      state.twoDReportHistory = state.luckyNo.data.filter(
        (d) => d.subCatId.catName_id === action.payload
      );
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

      //patch lottery setting start time end time called by game setting 2d general component
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
        console.log(state.getGameCat);
        state.allTwoDArr = state.getGameCat.data.allGameCategory.filter(
          (d) => d.cat_name === "2D Lottries" || d.cat_name === "3D Lottires"
        );
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
        console.log(state.getSupGameCat);
      })
      .addCase(fetGetSubGameCat.rejected, (state, action) => {
        state.getSupGameCatStatus = "failed";
        state.getSupGameCatError = action.error.message;
      })

      //fetchFilterPatchLotterySetting Edit subgamecategory filter
      .addCase(fetchFilterPatchLotterySetting.pending, (state) => {
        state.filterEditGameStatus = "loading";
      })
      .addCase(fetchFilterPatchLotterySetting.fulfilled, (state, action) => {
        state.filterEditGameStatus = "succeeded";
        state.filterEditGame = action.payload;
        console.log(state.filterEditGame);
      })
      .addCase(fetchFilterPatchLotterySetting.rejected, (state, action) => {
        state.filterEditGameStatus = "failed";
        state.filterEditGameError = action.error.message;
      })

      //get luckyy NO history category  this will be go 2D report page table3**************
      .addCase(fetGetLuckyNoHistory.pending, (state) => {
        state.luckyNoStatus = "loading";
      })
      .addCase(fetGetLuckyNoHistory.fulfilled, (state, action) => {
        state.luckyNoStatus = "succeeded";
        state.luckyNo = action.payload;
      })
      .addCase(fetGetLuckyNoHistory.rejected, (state, action) => {
        state.luckyNoStatus = "failed";
        state.luckyNoError = action.error.message;
      })

      //get luckyy NO history category  this will be go 2D report page table3**************
      .addCase(fetGetLuckyWinner.pending, (state) => {
        state.luckyWinnerStatus = "loading";
      })
      .addCase(fetGetLuckyWinner.fulfilled, (state, action) => {
        state.luckyWinnerStatus = "succeeded";
        state.luckyWinner = action.payload;
      })
      .addCase(fetGetLuckyWinner.rejected, (state, action) => {
        state.luckyWinnerStatus = "failed";
        state.luckyWinnerError = action.error.message;
      })

      //Get lucky No for lucky number  page
      .addCase(fetGetLuckNo.pending, (state) => {
        state.luckyNoDataStatus = "loading";
      })
      .addCase(fetGetLuckNo.fulfilled, (state, action) => {
        state.luckyNoDataStatus = "succeeded";
        state.luckyNoData = action.payload;
        console.log(state.postLuckyNoData);
      })
      .addCase(fetGetLuckNo.rejected, (state, action) => {
        state.luckyNoDataStatus = "failed";
        state.luckyNoDataError = action.error.message;
      })

      //post lucky No for lucky number  page
      .addCase(postLuckyNo.pending, (state) => {
        state.postLuckyNoDataStatus = "loading";
      })
      .addCase(postLuckyNo.fulfilled, (state, action) => {
        state.postLuckyNoDataStatus = "succeeded";
        state.postLuckyNoData = action.payload;
        console.log(state.postLuckyNoData);
      })
      .addCase(postLuckyNo.rejected, (state, action) => {
        state.postLuckyNoDataStatus = "failed";
        state.postLuckyNoDataError = action.error.message;
      })

      //patch close No
      .addCase(fetPatchCloseNo.pending, (state) => {
        state.patchCloseNoStatus = "loading";
      })
      .addCase(fetPatchCloseNo.fulfilled, (state, action) => {
        state.patchCloseNoStatus = "succeeded";
        state.patchCloseNo = action.payload;
      })
      .addCase(fetPatchCloseNo.rejected, (state, action) => {
        state.patchCloseNoStatus = "failed";
        state.patchCloseNoError = action.error.message;
      })

      //patch Master game cat
      .addCase(fetPatchMasterGameCat.pending, (state) => {
        state.patchMasterGameCatStatus = "loading";
      })
      .addCase(fetPatchMasterGameCat.fulfilled, (state, action) => {
        state.patchMasterGameCatStatus = "succeeded";
        state.patchMasterGameCat = action.payload;
        console.log(state.patchMasterGameCat);
      })
      .addCase(fetPatchMasterGameCat.rejected, (state, action) => {
        state.patchMasterGameCatStatus = "failed";
        state.patchMasterGameCatError = action.error.message;
      })

      //patch Master game cat
      .addCase(fetPatchMasterSubGameCat.pending, (state) => {
        state.patchMasterSubGameCatStatus = "loading";
      })
      .addCase(fetPatchMasterSubGameCat.fulfilled, (state, action) => {
        state.patchMasterSubGameCatStatus = "succeeded";
        state.patchMasterSubGameCat = action.payload;
        console.log(state.patchMasterSubGameCat);
      })
      .addCase(fetPatchMasterSubGameCat.rejected, (state, action) => {
        state.patchMasterSubGameCatStatus = "failed";
        state.patchMasterSubGameCatError = action.error.message;
      });
  },
});

export const {
  closeGameCat,
  closeSupGameCat,
  setClickSubName,
  setFilterSupGameArr,
  setFilterTwoDArr,
  setFilterTwoDReportHistroy,
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
export const selectAllTwoDArr = (state) => state.twoDapi.allTwoDArr;
export const selectfilterTwoDArr = (state) => state.twoDapi.filterTwoDArr;

export const selectLuckyNo = (state) => state.twoDapi.luckyNo;
export const selectPostLuckyNo = (state) => state.twoDapi.postLuckyNoData;

export const selectPatchCloseNo = (state) => state.twoDapi.patchCloseNo;
export const selectPatchCloseNoStatus = (state) =>
  state.twoDapi.patchCloseNoStatus;

export const selectLuckyNoData = (state) => state.twoDapi.luckyNoData;

export const selectPatchMasterGameCatCloseStatus = (state) =>
  state.twoDapi.patchMasterGameCatStatus;

export const selectTwoDReportHistory = (state) =>
  state.twoDapi.twoDReportHistory;
export const selectTwoDTable1Histroy = (state) =>
  state.twoDapi.twoDTable1History;
export const selectLuckyWinner = (state) => state.twoDapi.luckyWinner;

export default twoDapiSlice.reducer;
