import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDataWithID,
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

    console.log(data);
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

export const fetchGetMasterGameCat = createAsyncThunk(
  "data/fetchGetMasterGameCat",
  async ({ api, idData, accessToken }) => {
    const data = await fetchDataWithID(api, idData, accessToken);
    return data;
  }
);

export const fetchGetMasterSubGameCat = createAsyncThunk(
  "data/fetchGetMasterSubGameCat",
  async ({ api, idData, accessToken }) => {
    const data = await fetchDataWithID(api, idData, accessToken);
    return data;
  }
);

export const fetGetAllCounts = createAsyncThunk(
  "data/fetGetAllCounts",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetDownLineMaster = createAsyncThunk(
  "data/fetGetDownLineMaster",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetDownLineAgent = createAsyncThunk(
  "data/fetGetDownLineAgent",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetDownLineUser = createAsyncThunk(
  "data/fetGetDownLineUser",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);
const initialState = {
  logInData: {},
  currentLoginUser: "",
  token: "",
  currentUserId: "",
  logInStatus: "idle",
  logInError: null,
  formshow: false,
  masterLayoutShow: false,
  agentLayoutShow: false,
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

  downLineMaster: null,
  downLineMasterStatus: "idle",
  downLineMasterError: null,
  downLineAgent: null,
  downLineAgentStatus: "idle",
  downLineAgentError: null,

  downLineUser: null,
  downLineUserStatus: "idle",
  downLineUserError: null,

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
  masterGameCat: null,
  masterGameCatStatus: "idle",
  masterGameCatError: null,
  masterSubGameCat: null,
  masterSubGameCatStatus: "idle",
  masterSubGameCatError: null,
  forAgentList: null,
  forMasterList: null,
  filterMasterSubGameCat: null,
  allCounts: null,
  allCountsStatus: "idle",
  allCountsError: null,
  modalCopyText: false,
  copyId: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    alreadyLogin: (state) => {
      state.formshow = true;
    },

    setFormShow: (state, action) => {
      state.formshow = action.payload;
    },

    setModalCopyText: (state, action) => {
      state.modalCopyText = action.payload;
    },

    setMasterLayoutShow: (state, action) => {
      state.masterLayoutShow = action.payload;
    },

    setAgentLayoutShow: (state, action) => {
      state.agentLayoutShow = action.payload;
    },

    setMasterGameCat: (state, action) => {
      state.masterGameCat.data.allGameCatStatus.categoryStatus =
        state.masterGameCat.data.allGameCatStatus.categoryStatus.map((d) =>
          d.cat_id === action.payload.id ? { ...d, status: !d.status } : d
        );
    },

    setFilterMasterSubGameCat: (state, action) => {
      state.filterMasterSubGameCat = state.filterMasterSubGameCat.filter(
        (d) => d.catName_id === action.payload
      );
      console.log(state.filterMasterSubGameCat);
    },

    closeMasterSubGameCat: (state, action) => {
      state.filterMasterSubGameCat = state.filterMasterSubGameCat.map((d) =>
        d._id === action.payload ? { ...d, status: !d.status } : d
      );
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
        state.currentLoginUser = state.logInData.user.role;
        state.currentUserId = state.logInData.user.userId;
        if (state.currentLoginUser === "Admin") {
          state.formshow = true;
        } else if (state.currentLoginUser === "Master") {
          state.masterLayoutShow = true;
        } else if (state.currentLoginUser === "Agent") {
          state.agentLayoutShow = true;
        } else {
          return;
        }
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
        console.log(state.allUser);
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
        state.forMasterList = state.master.data.userAll;
        console.log(state.master);
      })
      .addCase(fetchGetAllMaster.rejected, (state, action) => {
        state.masterStatus = "failed";
        state.masterError = action.error.message;
      })

      //for Downlineallmaster get method store mainUnit arr
      .addCase(fetGetDownLineMaster.pending, (state) => {
        state.downLineMasterStatus = "loading";
      })
      .addCase(fetGetDownLineMaster.fulfilled, (state, action) => {
        state.downLineMasterStatus = "succeeded";
        state.downLineMaster = action.payload;
      })
      .addCase(fetGetDownLineMaster.rejected, (state, action) => {
        state.downLineMasterStatus = "failed";
        state.downLineMasterError = action.error.message;
      })

      //for all agent get method store mainUnit arr
      .addCase(fetchGetAllAgent.pending, (state) => {
        state.agentStatus = "loading";
      })
      .addCase(fetchGetAllAgent.fulfilled, (state, action) => {
        state.agentStatus = "succeeded";
        state.agent = action.payload;
        state.forAgentList = state.agent.data.userAll;
      })
      .addCase(fetchGetAllAgent.rejected, (state, action) => {
        state.agentStatus = "failed";
        state.agentError = action.error.message;
      })

      //for downline all agent get method store mainUnit arr
      .addCase(fetGetDownLineAgent.pending, (state) => {
        state.downLineAgentStatus = "loading";
      })
      .addCase(fetGetDownLineAgent.fulfilled, (state, action) => {
        state.downLineAgentStatus = "succeeded";
        state.downLineAgent = action.payload;
      })
      .addCase(fetGetDownLineAgent.rejected, (state, action) => {
        state.downLineAgentStatus = "failed";
        state.downLineAgentError = action.error.message;
      })

      //for downline all user
      .addCase(fetGetDownLineUser.pending, (state) => {
        state.downLineUserStatus = "loading";
      })
      .addCase(fetGetDownLineUser.fulfilled, (state, action) => {
        state.downLineUserStatus = "succeeded";
        state.downLineUser = action.payload;
      })
      .addCase(fetGetDownLineUser.rejected, (state, action) => {
        state.downLineUserStatus = "failed";
        state.downLineUserError = action.error.message;
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

        if (state.postUser.status === "Success") {
          state.modalCopyText = true;
          state.copyId = state.postUser.data.user.userId;
        }
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

        if (state.postAgentStatus === "succeeded") {
          state.modalCopyText = true;
          state.copyId = state.postAgent?.data.user.userId;
        }
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
        state.modalCopyText = true;
        state.copyId = state.postMaster.data.user.userId;
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
      })
      //Master Game Cat
      .addCase(fetchGetMasterGameCat.pending, (state) => {
        state.masterGameCatStatus = "loading";
      })
      .addCase(fetchGetMasterGameCat.fulfilled, (state, action) => {
        state.masterGameCatStatus = "succeeded";
        state.masterGameCat = action.payload;
      })
      .addCase(fetchGetMasterGameCat.rejected, (state, action) => {
        state.masterGameCatStatus = "failed";
        state.masterGameCatError = action.error.message;
      })

      //Master SupGame Cat
      .addCase(fetchGetMasterSubGameCat.pending, (state) => {
        state.masterSubGameCatStatus = "loading";
      })
      .addCase(fetchGetMasterSubGameCat.fulfilled, (state, action) => {
        state.masterSubGameCatStatus = "succeeded";
        state.masterSubGameCat = action.payload;
        state.filterMasterSubGameCat =
          state.masterSubGameCat.data.allGameSubCatStatus.subCatStatus;

        console.log(state.masterSubGameCat, "master subgameCat");
      })
      .addCase(fetchGetMasterSubGameCat.rejected, (state, action) => {
        state.masterSubGameCatStatus = "failed";
        state.masterSubGameCatError = action.error.message;
      })

      //All Count Cat
      .addCase(fetGetAllCounts.pending, (state) => {
        state.allCountsStatus = "loading";
      })
      .addCase(fetGetAllCounts.fulfilled, (state, action) => {
        state.allCountsStatus = "succeeded";
        state.allCounts = action.payload;
      })
      .addCase(fetGetAllCounts.rejected, (state, action) => {
        state.allCountsStatus = "failed";
        state.allCountsError = action.error.message;
      });
  },
});

export const {
  alreadyLogin,
  setFormShow,
  setMasterLayoutShow,
  setMasterGameCat,
  setFilterMasterSubGameCat,
  closeMasterSubGameCat,
  setModalCopyText,
} = dataSlice.actions;

//logINDATA

export const selectcurrentLoginUser = (state) => state.data.currentLoginUser;

export const selectlogInData = (state) => state.data.logInData;
export const selectlogInStatus = (state) => state.data.logInStatus;
export const selectSetShowForm = (state) => state.data.formshow;
export const selectAgentLayoutShow = (state) => state.data.agentLayoutShow;
export const selectMasterLayoutShow = (state) => state.data.masterLayoutShow;
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

export const selectMasterGameCat = (state) => state.data.masterGameCat;
export const selectMasterSubGameCat = (state) => state.data.masterSubGameCat;

export const selectForAgentList = (state) => state.data.forAgentList;
export const selectForMasterList = (state) => state.data.forMasterList;
export const selectFilterMasterSubGame = (state) =>
  state.data.filterMasterSubGameCat;

export const selectAllCounts = (state) => state.data.allCounts;
export const selectCurrentUserId = (state) => state.data.currentUserId;

export const selectModalCopyText = (state) => state.data.modalCopyText;
export const selectCopyId = (state) => state.data.copyId;

export const selectDownLineMaster = (state) => state.data.downLineMaster;
export const selectDownLineAgent = (state) => state.data.downLineAgent;

export const selectDownLineUser = (state) => state.data.downLineUser;

export default dataSlice.reducer;
