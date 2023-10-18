import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchData,
  postDatas,
  patchDatas,
  fetchDataWithToken,
  postDataWithToken,
} from "../app/api";

export const fetchMainUnit = createAsyncThunk(
  "data/fetchMainUnit",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
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
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
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

export const fetchGetAllMaster = createAsyncThunk(
  "data/fetchGetAllMaster",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetchGetAllAgent = createAsyncThunk(
  "data/fetchGetAllAgent",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const postAlluser = createAsyncThunk(
  "data/postAlluser",
  async ({ api, postData }) => {
    const data = await postDatas(api, postData);

    return data;
  }
);

export const fetchPostAllAgent = createAsyncThunk(
  "data/fetchPostAllAgent",
  async ({ api, postData }) => {
    const data = await postDatas(api, postData);

    return data;
  }
);

export const fetchPostAllMaster = createAsyncThunk(
  "data/fetchPostAllMaster",
  async ({ api, postData }) => {
    const data = await postDatas(api, postData);

    return data;
  }
);

export const postTransferUnit = createAsyncThunk(
  "data/postTransferUnit",
  async ({ api, postData, accessToken }) => {
    const data = await postDataWithToken(api, postData, accessToken);
    return data;
  }
);

export const fetchGetAllUnitTransfer = createAsyncThunk(
  "data/fetchGetAllUnitTransfer",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

const initialState = {
  logInData: {},
  currentLoginUser: "",
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
  postUser: {},
  postUserStatus: "idle",
  postUserError: null,
  master: null,
  masterStatus: "idle",
  masterError: null,
  agent: null,
  agentStatus: "idle",
  agentError: null,
  postAgent: {},
  postAgentStatus: "idle",
  postAgentError: null,
  postMaster: {},
  postMasterStatus: "idle",
  postMasterError: null,
  postTransfer: {},
  postTransferStatus: "idle",
  postTransferError: null,
  getUnitTransfer: null,
  getUnitTransferStatus: "idle",
  getUnitTransferError: null,
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
        state.currentLoginUser = state.logInData.user.role;
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
        state.allMainUnitAmount =
          state.mainUnitData.data.mainUnitValue.mainUnit;
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

        // console.log(state.mainUnitHistory);
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

      //for allmaster get method store mainUnit arr
      .addCase(fetchGetAllMaster.pending, (state) => {
        state.masterStatus = "loading";
      })
      .addCase(fetchGetAllMaster.fulfilled, (state, action) => {
        state.masterStatus = "succeeded";
        state.master = action.payload;
      })
      .addCase(fetchGetAllMaster.rejected, (state, action) => {
        state.masterStatus = "failed";
        state.masterError = action.error.message;
      })

      //for all agent get method store mainUnit arr
      .addCase(fetchGetAllAgent.pending, (state) => {
        state.agentStatus = "loading";
      })
      .addCase(fetchGetAllAgent.fulfilled, (state, action) => {
        state.agentStatus = "succeeded";
        state.agent = action.payload;
      })
      .addCase(fetchGetAllAgent.rejected, (state, action) => {
        state.agentStatus = "failed";
        state.agentError = action.error.message;
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
      })

      //for post all user method store mainUnit arr
      .addCase(postAlluser.pending, (state) => {
        state.postUserStatus = "loading";
      })
      .addCase(postAlluser.fulfilled, (state, action) => {
        state.postUserStatus = "succeeded";
        state.postUser = action.payload;
      })
      .addCase(postAlluser.rejected, (state, action) => {
        state.postUserStatus = "failed";
        state.postUserError = action.error.message;
      })

      //for post all agent method store mainUnit arr
      .addCase(fetchPostAllAgent.pending, (state) => {
        state.postAgentStatus = "loading";
      })
      .addCase(fetchPostAllAgent.fulfilled, (state, action) => {
        state.postAgentStatus = "succeeded";
        state.postAgent = action.payload;
      })
      .addCase(fetchPostAllAgent.rejected, (state, action) => {
        state.postAgentStatus = "failed";
        state.postAgentError = action.error.message;
      })

      //for post all master method store mainUnit arr
      .addCase(fetchPostAllMaster.pending, (state) => {
        state.postMasterStatus = "loading";
      })
      .addCase(fetchPostAllMaster.fulfilled, (state, action) => {
        state.postMasterStatus = "succeeded";
        state.postMaster = action.payload;
        console.log(state.postMaster);
      })
      .addCase(fetchPostAllMaster.rejected, (state, action) => {
        state.postMasterStatus = "failed";
        state.postMasterError = action.error.message;
      })

      //for post unit transfer admin to user method store mainUnit arr
      .addCase(postTransferUnit.pending, (state) => {
        state.postTransferStatus = "loading";
      })
      .addCase(postTransferUnit.fulfilled, (state, action) => {
        state.postTransferStatus = "succeeded";
        state.postTransfer = action.payload;
      })
      .addCase(postTransferUnit.rejected, (state, action) => {
        state.postTransferStatus = "failed";
        state.postTransferError = action.error.message;
        console.log(state.postTransferError);
      })
      //for get unit transfer admin to user method store mainUnit arr
      .addCase(fetchGetAllUnitTransfer.pending, (state) => {
        state.getUnitTransferStatus = "loading";
      })
      .addCase(fetchGetAllUnitTransfer.fulfilled, (state, action) => {
        state.getUnitTransferStatus = "succeeded";
        state.getUnitTransfer = action.payload;
        console.log(state.getUnitTransfer);
      })
      .addCase(fetchGetAllUnitTransfer.rejected, (state, action) => {
        state.getUnitTransferStatus = "failed";
        state.getUnitTransferError = action.error.message;
      });
  },
});

export const { alreadyLogin } = dataSlice.actions;

//logINDATA

export const selectcurrentLoginUser = (state) => state.data.currentLoginUser;

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

export const selectMaster = (state) => state.data.master;
export const selectMasterStatus = (state) => state.data.masterStatus;

export const selectAgents = (state) => state.data.agent;
export const selectAgentStatus = (state) => state.data.agentStatus;

export const selectAllAdmin = (state) => state.data.allAdmin;
export const selectAllAdminStatus = (state) => state.data.allAdminStatus;

//post user

export const selectPostUser = (state) => state.data.postUser;
export const selectPostUserStatus = (state) => state.data.postUserStatus;

export const selectPostAgent = (state) => state.data.postAgent;
export const selectPostAgentStatus = (state) => state.data.postAgentStatus;

export const selectPostMaster = (state) => state.data.postMaster;
export const selectPostMasterStatus = (state) => state.data.postMasterStatus;

export const selectPostTransfer = (state) => state.data.postTransfer;
export const selectPostTransferStatus = (state) =>
  state.data.postTransferStatus;

export const selectGetUnitTransfer = (state) => state.data.getUnitTransfer;
export const selectGetUnitTransferStatus = (state) =>
  state.data.getUnitTransferStatus;

export default dataSlice.reducer;
