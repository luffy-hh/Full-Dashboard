import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchData,
  postDatas,
  patchDatas,
  fetchDataWithToken,
} from "../app/api";

export const fetchMainUnit = createAsyncThunk(
  "data/fetchMainUnit",
  async (api) => {
    const data = await fetchData(api);
    return data;
  }
);

export const fetchPostLogin = createAsyncThunk(
  "data/fetchPostLogin",
  async ({ api, postData }) => {
    const data = await postDatas(api, postData);
    return data;
  }
);

export const fetchPatchMainUnit = createAsyncThunk(
  "data/fetchPatchMainUnit",
  async ({ api, patchData, accessToken }) => {
    const data = await patchDatas(api, patchData, accessToken);
    return data;
  }
);

export const fetchGetMainUnitHistory = createAsyncThunk(
  "data/fetchGetMainUnitHistory",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetchGetAlladmin = createAsyncThunk(
  "data/fetchGetAlladmin",
  async (api) => {
    const data = await fetchData(api);
    return data;
  }
);

export const fetchGetAlluser = createAsyncThunk(
  "data/fetchGetAlluser",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);
const initialState = {
  logInData: {},
  token: "",
  logInStatus: "idle",
  logInError: null,
  formshow: false,
  mainUnitData: null,
  allMainUnitAmount: null,
  mainUnitStatus: "idle",
  mainUnitError: null,
  patchMainUnitData: null,
  patchMainUnitStatus: "idle",
  patchMainUnitError: null,
  mainUnitHistory: {},
  mainUnitHistoryStatus: "idle",
  mainUnitHistoryError: null,
  allUser: null,
  allUserStatus: "idle",
  allUserError: null,
  allAdmin: null,
  allAdminStatus: "idle",
  allAdminError: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    alreadyLogin: (state) => {
      state.formshow = true;
    },
  },
  extraReducers: (builder) => {
    builder
      //for login post method store logInData [] arr
      .addCase(fetchPostLogin.pending, (state) => {
        state.logInStatus = "loading";
      })
      .addCase(fetchPostLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.logInData = action.payload;
        state.formshow = true;
      })
      .addCase(fetchPostLogin.rejected, (state, action) => {
        state.logInStatus = "failed";
        state.logInError = action.error.message;
      })

      //for main unit  get method store logInData [] arr
      .addCase(fetchMainUnit.pending, (state) => {
        state.mainUnitStatus = "loading";
      })
      .addCase(fetchMainUnit.fulfilled, (state, action) => {
        state.mainUnitStatus = "succeeded";
        state.mainUnitData = action.payload;
        state.allMainUnitAmount = state.mainUnitData.data.mainUnit[0].amount;
      })
      .addCase(fetchMainUnit.rejected, (state, action) => {
        state.mainUnitStatus = "failed";
        state.mainUnitError = action.error.message;
      })

      //for patch main unit  get method store logInData [] arr
      .addCase(fetchPatchMainUnit.pending, (state) => {
        state.patchMainUnitStatus = "loading";
      })
      .addCase(fetchPatchMainUnit.fulfilled, (state, action) => {
        state.patchMainUnitStatus = "succeeded";
        state.patchMainUnitData = action.payload;
        console.log(state.patchMainUnitData);
      })
      .addCase(fetchPatchMainUnit.rejected, (state, action) => {
        state.patchMainUnitStatus = "failed";
        state.patchMainUnitError = action.error.message;
      })

      //for mainUnit history get method store mainUnit arr
      .addCase(fetchGetMainUnitHistory.pending, (state) => {
        state.mainUnitHistoryStatus = "loading";
      })
      .addCase(fetchGetMainUnitHistory.fulfilled, (state, action) => {
        state.mainUnitHistoryStatus = "succeeded";
        state.mainUnitHistory = action.payload;
        console.log(state.mainUnitHistory);
      })
      .addCase(fetchGetMainUnitHistory.rejected, (state, action) => {
        state.mainUnitHistoryStatus = "failed";
        state.mainUnitHistoryError = action.error.message;
      })

      //for alluser get method store mainUnit arr
      .addCase(fetchGetAlluser.pending, (state) => {
        state.allUserStatus = "loading";
      })
      .addCase(fetchGetAlluser.fulfilled, (state, action) => {
        state.allUserStatus = "succeeded";
        state.allUser = action.payload;
      })
      .addCase(fetchGetAlluser.rejected, (state, action) => {
        state.allUserStatus = "failed";
        state.allUserError = action.error.message;
      })

      //for alladmin get method store mainUnit arr
      .addCase(fetchGetAlladmin.pending, (state) => {
        state.allAdminStatus = "loading";
      })
      .addCase(fetchGetAlladmin.fulfilled, (state, action) => {
        state.allAdminStatus = "succeeded";
        state.allAdmin = action.payload;
      })
      .addCase(fetchGetAlladmin.rejected, (state, action) => {
        state.allAdminStatus = "failed";
        state.allAdminError = action.error.message;
      });
  },
});

export const { alreadyLogin } = dataSlice.actions;

export const selectlogInData = (state) => state.data.logInData;
export const selectlogInStatus = (state) => state.data.logInStatus;
export const selectSetShowForm = (state) => state.data.formshow;
export const selectToken = (state) => state.data.token;

export const selectMainUnitData = (state) => state.data.mainUnitData;
export const selectMainUnitStatus = (state) => state.data.mainUnitStatus;

export const selectpatchMainUnitData = (state) => state.data.patchMainUnitData;
export const selectpatchMainUnitStatus = (state) =>
  state.data.patchMainUnitStatus;

export const selectMainUnitHistory = (state) => state.data.mainUnitHistory;
export const selectMainUnitHistoryStatus = (state) =>
  state.data.mainUnitHistoryStatus;

export const selectAllUser = (state) => state.data.allUser;
export const selectAllUserStatus = (state) => state.data.allUserStatus;

export const selectAllAdmin = (state) => state.data.allAdmin;
export const selectAllAdminStatus = (state) => state.data.allAdminStatus;
export default dataSlice.reducer;
