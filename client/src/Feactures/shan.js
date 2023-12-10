import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDataWithToken,
  postDataWithToken,
  postDataWithImg,
  patchDatas,
  fetchData,
} from "../app/api";

export const fetPostShanRing = createAsyncThunk(
  "data/fetPostShanRing",
  async ({ api, postData, accessToken }) => {
    const data = await postDataWithToken(api, postData, accessToken);
    console.log(data);
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

export const fetGetShanRoll = createAsyncThunk(
  "data/fetGetShanRoll",
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

export const fetGetShanGameRing = createAsyncThunk(
  "data/fetGetShanGameRing",
  async (api) => {
    const data = await fetchData(api);
    return data;
  }
);

const initialState = {
  showRoll: false,
  showRing: false,
  rollIds: "",

  postShanRoll: {},
  postShanRollStatus: "idle",
  postShanRollError: null,

  shanRoll: null,
  shanRollStatus: "idle",
  shanRollError: null,

  postShanRing: {},
  postShanRingStatus: "idle",
  postShanRingError: null,

  shanRing: null,
  shanRingStatus: "idle",
  shanRingError: null,

  shanGameRing: null,
  shanGameRingStatus: false,
  shanGameRingError: null,
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
      })
      .addCase(fetPostShanRoll.rejected, (state, action) => {
        state.postShanRollStatus = "failed";
        state.postShanRollError = action.error.message;
      })

      //for Shan Roll GET Method
      .addCase(fetGetShanRoll.pending, (state) => {
        state.shanRollStatus = "loading";
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
      })
      .addCase(fetPostShanRing.rejected, (state, action) => {
        state.postShanRingStatus = "failed";
        state.postShanRingError = action.error.message;
        console.log(state.postShanRingError);
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

export const { setShowRoll, setShowRing, setRollIds } = shan.actions;

export const selectShowRoll = (state) => state.shan.showRoll;
export const selectShowRing = (state) => state.shan.showRing;
export const selectRollIds = (state) => state.shan.rollIds;

export const selectShanRoll = (state) => state.shan.shanRoll;
export const selectPostShanRoll = (state) => state.shan.postShanRoll;
export const selectPostShanRollStatus = (state) =>
  state.shan.postShanRollStatus;

export const selectPostShanRingStatus = (state) =>
  state.shan.postShanRingStatus;
export const selectPostShanRing = (state) => state.shan.postShanRing;

export const selectShanRing = (state) => state.shan.shanRing;

export const selectShanGameRing = (state) => state.shan.shanGameRing;

export default shan.reducer;
