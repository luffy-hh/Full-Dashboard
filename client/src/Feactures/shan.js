import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDataWithToken,
  postDataWithToken,
  postDataWithImg,
  patchDatas,
  fetchData,
} from "../app/api";
import { io } from "socket.io-client";

export const fetPostShanRing = createAsyncThunk(
  "data/fetPostShanRing",
  async ({ api, postData, accessToken }) => {
    const data = await postDataWithToken(api, postData, accessToken);

    return data;
  }
);

export const fetGetShanRing = createAsyncThunk(
  "data/fetGetShanRing",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetPostShanRoll = createAsyncThunk(
  "data/fetPostShanRoll",
  async ({ api, formData, accessToken }) => {
    const data = await postDataWithImg(api, formData, accessToken);
    return data;
  }
);

export const fetGetShanRoll = createAsyncThunk(
  "data/fetGetShanRoll",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetShanGameRing = createAsyncThunk(
  "data/fetGetShanGameRing",
  async (api) => {
    const data = await fetchData(api);
    return data;
  }
);

const shanGame = {
  betRangeShow: false,
  betRangeAmount: 0,
  waitPlayer: true,
  bettingTime: true,
  playerBetAmount: null,
  dragCard: false,
  pullCard: false,
  isBanker: false,
  pullCardShow: false,
  result: false,
};

const initialState = {
  shanGame,
  showRoll: false,
  showRing: false,
  rollIds: "all",

  shanRoll: {},
  shanRollStatus: "idle",
  shanRollError: null,

  postShanRoll: {},
  postShanRollStatus: "idle",
  postShanRollError: null,

  postShanRing: {},
  postShanRingStatus: "idle",
  postShanRingError: null,

  shanRing: null,
  shanRingStatus: "idle",
  shanRingError: null,

  shanGameRing: null,
  shanGameRingStatus: false,
  shanGameRingError: null,

  nextCard: [],
};

const shan = createSlice({
  name: "shan",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.createRoll[0].name = action.payload;
    },

    setShowRoll: (state, action) => {
      state.showRoll = action.payload;
    },

    setShowRing: (state, action) => {
      state.showRing = action.payload;
    },

    setRollIds: (state, action) => {
      state.rollIds = action.payload;
    },

    setBetRangeShow: (state, action) => {
      state.shanGame.betRangeShow = action.payload;
    },

    setBetRangeAmount: (state, action) => {
      state.shanGame.betRangeAmount = action.payload;
    },

    setPostShanRing: (state) => {
      state.postShanRing = {};
    },

    setBettingTime: (state, action) => {
      state.shanGame.bettingTime = action.payload;
    },

    setWaitPlayer: (state, action) => {
      state.shanGame.waitPlayer = action.payload;
    },

    setPlayerBetAmount: (state, action) => {
      state.shanGame.playerBetAmount = action.payload;
    },

    setDragCard: (state, action) => {
      state.shanGame.dragCard = action.payload;
    },

    setPullCard: (state, action) => {
      state.shanGame.pullCard = action.payload;
    },

    setPullCardShow: (state, action) => {
      state.shanGame.pullCardShow = action.payload;
    },

    setIsBanker: (state, action) => {
      state.shanGame.isBanker = action.payload;
    },

    setResult: (state, action) => {
      state.shanGame.result = action.payload;
    },

    setShanRoll: (state) => {
      state.postShanRoll = {};
    },

    setNextCard: (state, action) => {
      state.nextCard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //for ShanRoll Post Method
      .addCase(fetPostShanRoll.pending, (state) => {
        state.postShanRollStatus = "loading";
      })
      .addCase(fetPostShanRoll.fulfilled, (state, action) => {
        state.postShanRollStatus = "succeeded";
        state.postShanRoll = action.payload;
        // const socket = io("https://gamevegas.online/updateRole");
        // socket.emit("updateRole", { message: "Role created" });
        console.log(state.postShanRoll);
      })
      .addCase(fetPostShanRoll.rejected, (state, action) => {
        state.postShanRollStatus = "failed";
        state.postShanRollError = action.error.message;
      })

      //For fetGetShanRoll GET Method
      .addCase(fetGetShanRoll.pending, (state) => {
        state.shanRoll = "loading";
      })
      .addCase(fetGetShanRoll.fulfilled, (state, action) => {
        state.shanRollStatus = "succeeded";
        state.shanRoll = action.payload;
      })
      .addCase(fetGetShanRoll.rejected, (state, action) => {
        state.shanRollStatus = "failed";
        state.shanRollError = action.error.message;
      })

      //For ShanRing GET Method
      .addCase(fetGetShanRing.pending, (state) => {
        state.shanRingStatus = "loading";
      })
      .addCase(fetGetShanRing.fulfilled, (state, action) => {
        state.shanRingStatus = "succeeded";
        state.shanRing = action.payload;
      })
      .addCase(fetGetShanRing.rejected, (state, action) => {
        state.shanRingStatus = "failed";
        state.shanRingError = action.error.message;
      })

      //for Shan Ring POST METHOD
      .addCase(fetPostShanRing.pending, (state) => {
        state.postShanRingStatus = "loading";
      })
      .addCase(fetPostShanRing.fulfilled, (state, action) => {
        state.postShanRingStatus = "succeeded";
        state.postShanRing = action.payload;
        const socket = io("https://gamevegas.online");
        socket.emit("updateTable", { roleId: state.rollIds });
      })
      .addCase(fetPostShanRing.rejected, (state, action) => {
        state.postShanRingStatus = "failed";
        state.postShanRingError = action.error.message;
      })

      //For ShanGame Ring GET Method
      .addCase(fetGetShanGameRing.pending, (state) => {
        state.shanGameRingStatus = false;
      })
      .addCase(fetGetShanGameRing.fulfilled, (state, action) => {
        state.shanGameRingStatus = true;
        state.shanGameRing = action.payload;
      })
      .addCase(fetGetShanGameRing.rejected, (state, action) => {
        state.shanGameRingStatus = false;
        state.shanGameRingError = action.error.message;
      });
  },
});

export const {
  setShowRoll,
  setShowRing,
  setRollIds,
  setBetRangeShow,
  setBetRangeAmount,
  setPostShanRing,
  setWaitPlayer,
  setBettingTime,
  setPlayerBetAmount,
  setDragCard,
  setIsBanker,
  setPullCard,
  setPullCardShow,
  setResult,
  setShanRoll,
  setNextCard,
} = shan.actions;

// GAME STATE AND DATA========================================================
export const selectBetRangeShow = (state) => state.shan.shanGame.betRangeShow;
export const selectBetRangeAmount = (state) =>
  state.shan.shanGame.betRangeAmount;

export const selectNextCard = (state) => state.shan.nextCard;

export const selectWaitPlayer = (state) => state.shan.shanGame.waitPlayer;
export const selectBettingTime = (state) => state.shan.shanGame.bettingTime;
export const selectPlayerBetAmount = (state) =>
  state.shan.shanGame.playerBetAmount;
export const selectDragCard = (state) => state.shan.shanGame.dragCard;
export const selectPullCard = (state) => state.shan.shanGame.pullCard;
export const selectPullCardShow = (state) => state.shan.shanGame.pullCardShow;
export const selectIsBanker = (state) => state.shan.shanGame.isBanker;
export const selectResult = (state) => state.shan.shanGame.result;
// GAME STATE AND DATA========================================================

export const selectShowRoll = (state) => state.shan.showRoll;
export const selectShowRing = (state) => state.shan.showRing;
export const selectRollIds = (state) => state.shan.rollIds;

export const selectPostShanRoll = (state) => state.shan.postShanRoll;
export const selectPostShanRollStatus = (state) =>
  state.shan.postShanRollStatus;

export const selectPostShanRingStatus = (state) =>
  state.shan.postShanRingStatus;
export const selectPostShanRing = (state) => state.shan.postShanRing;
export const selectPostShanRingError = (state) => state.shan.postShanRingError;

export const selectShanRing = (state) => state.shan.shanRing;

export const selectShanGameRing = (state) => state.shan.shanGameRing;
export const selectShanRoll = (state) => state.shan.shanRoll;

export default shan.reducer;
