import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDataWithToken,
  postDataWithToken,
  postDataWithImg,
  patchDatas,
} from "../app/api";

export const fetGetBankCat = createAsyncThunk(
  "data/fetGetBankCat",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetPostBankCat = createAsyncThunk(
  "data/fetPostBankCat",
  async ({ api, postData, accessToken }) => {
    const data = await postDataWithToken(api, postData, accessToken);
    return data;
  }
);

export const fetGetBankType = createAsyncThunk(
  "data/fetGetBankType",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetPostBankType = createAsyncThunk(
  "data/fetPostBankType",
  async ({ api, postData, accessToken }) => {
    const data = await postDataWithToken(api, postData, accessToken);
    return data;
  }
);

export const fetPostBankName = createAsyncThunk(
  "data/fetPostBankName",
  async ({ api, formData, accessToken }) => {
    const data = await postDataWithImg(api, formData, accessToken);
    return data;
  }
);

export const fetGetBankName = createAsyncThunk(
  "data/fetGetBankName",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetPostBankAcc = createAsyncThunk(
  "data/fetPostBankAcc",
  async ({ api, formData, accessToken }) => {
    const data = await postDataWithImg(api, formData, accessToken);
    return data;
  }
);

export const fetGetBankAcc = createAsyncThunk(
  "data/fetGetBankAcc",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetBankAnnounc = createAsyncThunk(
  "data/fetGetBankAnnounc",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetPatchBankAnnounc = createAsyncThunk(
  "data/fetPatchBankAnnounc",
  async ({ api, patchData, accessToken }) => {
    const data = await patchDatas(api, patchData, accessToken);
    return data;
  }
);

export const fetPostDeposit = createAsyncThunk(
  "data/fetPostDeposit",
  async ({ api, postData, accessToken }) => {
    const data = await postDataWithToken(api, postData, accessToken);
    return data;
  }
);

export const fetGetDeposit = createAsyncThunk(
  "data/fetGetDeposit",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

//
export const fetGetBankAccUpline = createAsyncThunk(
  "data/fetGetBankAccUpline",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetBankNameUpline = createAsyncThunk(
  "data/fetGetBankNameUpline",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetPostWithdraw = createAsyncThunk(
  "data/fetPostWithdraw",
  async ({ api, postData, accessToken }) => {
    const data = await postDataWithToken(api, postData, accessToken);
    return data;
  }
);

export const fetGetwithdraw = createAsyncThunk(
  "data/fetGetwithdraw",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetMasterWithdraw = createAsyncThunk(
  "data/fetGetMasterWithdraw",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetWithdrawUpline = createAsyncThunk(
  "data/fetGetWithdrawUpline",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetMasterWithdrawUpline = createAsyncThunk(
  "data/fetGetMasterWithdrawUpline",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetAgentWithdrawUpline = createAsyncThunk(
  "data/fetGetAgentWithdrawUpline",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetPatchWithDraw = createAsyncThunk(
  "data/fetPatchWithDraw",
  async ({ api, patchData, accessToken }) => {
    const data = await patchDatas(api, patchData, accessToken);
    return data;
  }
);

export const fetPatchDeposit = createAsyncThunk(
  "data/fetPatchDeposit",
  async ({ api, patchData, accessToken }) => {
    const data = await patchDatas(api, patchData, accessToken);
    return data;
  }
);

export const fetGetMasterDeposit = createAsyncThunk(
  "data/fetGetMasterDeposit",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetDepositUpline = createAsyncThunk(
  "data/fetGetDepositUpline",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetMasterDepositUpline = createAsyncThunk(
  "data/fetGetMasterDepositUpline",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

export const fetGetAgentDepositUpline = createAsyncThunk(
  "data/fetGetAgentDepositUpline",
  async ({ api, accessToken }) => {
    const data = await fetchDataWithToken(api, accessToken);
    return data;
  }
);

const toDeposite = {
  clickBankNameId: "",
  clickBankAcc: "",
  clickName: "",
  showDepForm: false,
  bankNameId: "",
};

const initialState = {
  toDeposite,
  bankCat: null,
  bankCatStatus: "idle",
  bankCatError: null,
  postBankCat: {},
  postBankCatStatus: "idle",
  postBankCatError: null,

  bankType: null,
  bankTypeStatus: "idle",
  bankTypeError: null,
  postBankType: {},
  postBankTypeStatus: "idle",
  postBankTypeError: null,

  postBankName: {},
  postBankNameStatus: "idle",
  postBankNameError: null,
  bankName: null,
  bankNameStatus: "idle",
  bankNameError: null,
  bankAcc: null,
  bankAccStatus: "idle",
  bankAccError: null,
  postBankAcc: {},
  postBankAccStatus: "idle",
  postBankAccError: null,
  bankAnnounc: null,
  bankAnnouncStatus: "idle",
  bankAnnouncError: null,
  patchBankAnnounc: null,
  patchBankAnnouncStatus: "idle",
  patchBankAnnouncError: null,

  bankAccUpline: null,
  bankAccUplineStatus: "idle",
  bankAccUplineError: null,

  bankNameUpline: null,
  bankNameUplineStatus: "idle",
  bankNameUplineError: null,

  postWithdraw: {},
  postWithdrawStatus: "idle",
  postWithdrawError: null,

  postDeposit: {},
  postDepositStatus: "idle",
  postDepositError: null,

  withdraw: null,
  withdrawStatus: "idle",
  withdrawError: null,

  withdrawUpLine: null,
  withdrawUpLineStatus: "idle",
  withdrawUpLineError: null,

  masterWithdraw: null,
  masterWithdrawStatus: "idle",
  masterWithdrawError: null,

  masterWithdrawUpLine: null,
  masterWithdrawUpLineStatus: "idle",
  masterWithdrawUpLineError: null,

  agentWithdrawUpLine: null,
  agentWithdrawUpLineStatus: "idle",
  agentWithdrawUpLineError: null,

  deposit: null,
  depositStatus: "idle",
  depositError: null,

  depositUpLine: null,
  depositUpLineStatus: "idle",
  depositUpLineError: null,

  masterDeposit: null,
  masterDepositStatus: "idle",
  masterDepositError: null,

  masterDepositUpLine: null,
  masterDepositUpLineStatus: "idle",
  masterDepositUpLineError: null,

  agentDepositUpLine: null,
  agentDepositUpLineStatus: "idle",
  agentDepositUpLineError: null,

  patchWithdraw: {},
  patchWithdrawStatus: "idle",
  patchWithdrawError: null,

  patchDeposit: {},
  patchDepositStatus: "idle",
  patchDepositError: null,

  admintDownandUpHistory: null,
  masterDownandUpHistroy: null,
  depositAdminHistory: null,
  depositMasterHistory: null,
};
const bankApiSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    setShowDepoForm: (state) => {
      state.toDeposite.showDepForm = !state.toDeposite.showDepForm;
    },

    setBankNameIds: (state, action) => {
      state.toDeposite.bankNameId = action.payload;
    },

    setPostDeposit: (state) => {
      state.postDeposit = {};
    },

    setPostWithdraw: (state) => {
      state.postWithdraw = {};
    },
  },
  extraReducers: (builder) => {
    builder
      //for bank type get method
      .addCase(fetGetBankCat.pending, (state) => {
        state.bankCatStatus = "loading";
      })
      .addCase(fetGetBankCat.fulfilled, (state, action) => {
        state.bankCatStatus = "succeeded";
        state.bankCat = action.payload;
      })
      .addCase(fetGetBankCat.rejected, (state, action) => {
        state.bankCatStatus = "failed";
        state.bankCatError = action.error.message;
      })
      //for bank type post method
      .addCase(fetPostBankCat.pending, (state) => {
        state.postBankCatStatus = "loading";
      })
      .addCase(fetPostBankCat.fulfilled, (state, action) => {
        state.postBankCatStatus = "succeeded";
        state.postBankCat = action.payload;
      })
      .addCase(fetPostBankCat.rejected, (state, action) => {
        state.postBankCatStatus = "failed";
        state.postBankCatError = action.error.message;
      })

      //get bank Type get method
      .addCase(fetGetBankType.pending, (state) => {
        state.bankTypeStatus = "loading";
      })
      .addCase(fetGetBankType.fulfilled, (state, action) => {
        state.bankTypeStatus = "succeeded";
        state.bankType = action.payload;
      })
      .addCase(fetGetBankType.rejected, (state, action) => {
        state.bankTypeStatus = "failed";
        state.bankTypeError = action.error.message;
      })

      //for bank type post mehtod
      .addCase(fetPostBankType.pending, (state) => {
        state.postBankTypeStatus = "loading";
      })
      .addCase(fetPostBankType.fulfilled, (state, action) => {
        state.postBankTypeStatus = "succeeded";
        state.postBankType = action.payload;
      })
      .addCase(fetPostBankType.rejected, (state, action) => {
        state.postBankTypeStatus = "failed";
        state.postBankTypeError = action.error.message;
      })

      //for bank type post method
      .addCase(fetPostBankName.pending, (state) => {
        state.postBankNameStatus = "loading";
      })
      .addCase(fetPostBankName.fulfilled, (state, action) => {
        state.postBankNameStatus = "succeeded";
        state.postBankName = action.payload;
        console.log(state.postBankName, "testing");
      })
      .addCase(fetPostBankName.rejected, (state, action) => {
        state.postBankNameStatus = "failed";
        state.postBankNameError = action.error.message;
        console.log(state.postBankNameError);
      })

      //for bank name get method
      .addCase(fetGetBankName.pending, (state) => {
        state.bankNameStatus = "loading";
      })
      .addCase(fetGetBankName.fulfilled, (state, action) => {
        state.bankNameStatus = "succeeded";
        state.bankName = action.payload;
      })
      .addCase(fetGetBankName.rejected, (state, action) => {
        state.bankNameStatus = "failed";
        state.bankNameError = action.error.message;
      })

      //for bank Acc get method
      .addCase(fetGetBankAcc.pending, (state) => {
        state.bankAccStatus = "loading";
      })
      .addCase(fetGetBankAcc.fulfilled, (state, action) => {
        state.bankAccStatus = "succeeded";
        state.bankAcc = action.payload;
      })
      .addCase(fetGetBankAcc.rejected, (state, action) => {
        state.bankAccStatus = "failed";
        state.bankAccError = action.error.message;
      })

      //for bank Acc  Post method
      .addCase(fetPostBankAcc.pending, (state) => {
        state.postBankAccStatus = "loading";
      })
      .addCase(fetPostBankAcc.fulfilled, (state, action) => {
        state.postBankAccStatus = "succeeded";
        state.postBankAcc = action.payload;
        console.log(state.postBankAcc);
      })
      .addCase(fetPostBankAcc.rejected, (state, action) => {
        state.postBankAccStatus = "failed";
        state.postBankAccError = action.error.message;
      })

      //for bank Announc  get method
      .addCase(fetGetBankAnnounc.pending, (state) => {
        state.bankAnnouncStatus = "loading";
      })
      .addCase(fetGetBankAnnounc.fulfilled, (state, action) => {
        state.bankAnnouncStatus = "succeeded";
        state.bankAnnounc = action.payload;
        console.log(state.bankAnnounc);
      })
      .addCase(fetGetBankAnnounc.rejected, (state, action) => {
        state.bankAnnouncStatus = "failed";
        state.bankAnnouncError = action.error.message;
      })

      //for bank Announc  get method
      .addCase(fetPatchBankAnnounc.pending, (state) => {
        state.patchBankAnnouncStatus = "loading";
      })
      .addCase(fetPatchBankAnnounc.fulfilled, (state, action) => {
        state.patchBankAnnouncStatus = "succeeded";
        state.patchBankAnnounc = action.payload;
        console.log(state.patchBankAnnounc);
      })
      .addCase(fetPatchBankAnnounc.rejected, (state, action) => {
        state.patchBankAnnouncStatus = "failed";
        state.patchBankAnnouncError = action.error.message;
      })

      //for Deposit  post method
      .addCase(fetPostDeposit.pending, (state) => {
        state.postDepositStatus = "loading";
      })
      .addCase(fetPostDeposit.fulfilled, (state, action) => {
        state.postDepositStatus = "succeeded";
        state.postDeposit = action.payload;
        console.log(state.postDeposit, "Post Deposit");
      })
      .addCase(fetPostDeposit.rejected, (state, action) => {
        state.postDepositStatus = "failed";
        state.postDepositError = action.error.message;
      })

      //for Deposit  GET  method
      .addCase(fetGetDeposit.pending, (state) => {
        state.postDepositStatus = "loading";
      })
      .addCase(fetGetDeposit.fulfilled, (state, action) => {
        state.depositStatus = "succeeded";
        state.deposit = action.payload;
        state.depositAdminHistory = state.deposit.data.allDepositDownline;
      })
      .addCase(fetGetDeposit.rejected, (state, action) => {
        state.depositStatus = "failed";
        state.depositError = action.error.message;
      })

      //GET bank Acc upline
      .addCase(fetGetBankAccUpline.pending, (state) => {
        state.bankAccUplineStatus = "loading";
      })
      .addCase(fetGetBankAccUpline.fulfilled, (state, action) => {
        state.bankAccUplineStatus = "succeeded";
        state.bankAccUpline = action.payload;
      })
      .addCase(fetGetBankAccUpline.rejected, (state, action) => {
        state.bankAccUplineStatus = "failed";
        state.bankAccUplineError = action.error.message;
      })

      //GET bank Name upline
      .addCase(fetGetBankNameUpline.pending, (state) => {
        state.bankNameUplineStatus = "loading";
      })
      .addCase(fetGetBankNameUpline.fulfilled, (state, action) => {
        state.bankNameUplineStatus = "succeeded";
        state.bankNameUpline = action.payload;
        console.log(state.bankNameUpline);
      })
      .addCase(fetGetBankNameUpline.rejected, (state, action) => {
        state.bankNameUplineStatus = "failed";
        state.bankNameUplineError = action.error.message;
      })

      //Post withdraw
      .addCase(fetPostWithdraw.pending, (state) => {
        state.postWithdrawStatus = "loading";
      })
      .addCase(fetPostWithdraw.fulfilled, (state, action) => {
        state.postWithdrawStatus = "succeeded";
        state.postWithdraw = action.payload;
        console.log(state.postWithdraw);
      })
      .addCase(fetPostWithdraw.rejected, (state, action) => {
        state.postWithdrawStatus = "failed";
        state.postWithdrawError = action.error.message;
      })

      //GET Withdraw
      .addCase(fetGetwithdraw.pending, (state) => {
        state.withdrawStatus = "loading";
      })
      .addCase(fetGetwithdraw.fulfilled, (state, action) => {
        state.withdrawStatus = "succeeded";
        state.withdraw = action.payload;
        console.log(state.withdraw);
        state.admintDownandUpHistory = state.withdraw;
      })
      .addCase(fetGetwithdraw.rejected, (state, action) => {
        state.withdrawStatus = "failed";
        state.withdrawError = action.error.message;
      })

      //GET Master Withdraw
      .addCase(fetGetMasterWithdraw.pending, (state) => {
        state.masterWithdrawStatus = "loading";
      })
      .addCase(fetGetMasterWithdraw.fulfilled, (state, action) => {
        state.masterWithdrawStatus = "succeeded";
        state.masterWithdraw = action.payload;
        state.masterDownandUpHistroy = state.masterWithdraw;
      })
      .addCase(fetGetMasterWithdraw.rejected, (state, action) => {
        state.masterWithdrawStatus = "failed";
        state.masterWithdrawError = action.error.message;
      })

      //GET withdraw Upline
      .addCase(fetGetWithdrawUpline.pending, (state) => {
        state.withdrawUpLineStatus = "loading";
      })
      .addCase(fetGetWithdrawUpline.fulfilled, (state, action) => {
        state.withdrawUpLineStatus = "succeeded";
        state.withdrawUpLine = action.payload;
        console.log(state.withdrawUpLine);
        state.admintDownandUpHistory = state.withdrawUpLine;
      })
      .addCase(fetGetWithdrawUpline.rejected, (state, action) => {
        state.withdrawUpLineStatus = "failed";
        state.withdrawUpLineError = action.error.message;
      })

      //GET MasterWithdraw Upline
      .addCase(fetGetMasterWithdrawUpline.pending, (state) => {
        state.masterWithdrawUpLineStatus = "loading";
      })
      .addCase(fetGetMasterWithdrawUpline.fulfilled, (state, action) => {
        state.masterWithdrawUpLineStatus = "succeeded";
        state.masterWithdrawUpLine = action.payload;

        state.masterDownandUpHistroy = state.masterWithdrawUpLine;
      })
      .addCase(fetGetMasterWithdrawUpline.rejected, (state, action) => {
        state.masterWithdrawUpLineStatus = "failed";
        state.masterWithdrawUpLineError = action.error.message;
      })

      //GET AgentWithdraw Upline
      .addCase(fetGetAgentWithdrawUpline.pending, (state) => {
        state.agentWithdrawUpLineStatus = "loading";
      })
      .addCase(fetGetAgentWithdrawUpline.fulfilled, (state, action) => {
        state.agentWithdrawUpLineStatus = "succeeded";
        state.agentWithdrawUpLine = action.payload;
      })
      .addCase(fetGetAgentWithdrawUpline.rejected, (state, action) => {
        state.agentWithdrawUpLineStatus = "failed";
        state.agentWithdrawUpLineError = action.error.message;
      })

      //PATCH Withdraw
      .addCase(fetPatchWithDraw.pending, (state) => {
        state.patchWithdrawStatus = "loading";
      })
      .addCase(fetPatchWithDraw.fulfilled, (state, action) => {
        state.patchWithdrawStatus = "succeeded";
        state.patchWithdraw = action.payload;
        console.log(state.patchWithdraw, "new");
      })
      .addCase(fetPatchWithDraw.rejected, (state, action) => {
        state.patchWithdrawStatus = "failed";
        state.patchWithdrawError = action.error.message;
      })

      //PATCH Deposit
      .addCase(fetPatchDeposit.pending, (state) => {
        state.patchDepositStatus = "loading";
      })
      .addCase(fetPatchDeposit.fulfilled, (state, action) => {
        state.patchDepositStatus = "succeeded";
        state.patchDeposit = action.payload;
        console.log(state.patchDeposit, "new");
      })
      .addCase(fetPatchDeposit.rejected, (state, action) => {
        state.patchDepositStatus = "failed";
        state.patchDepositError = action.error.message;
      })

      //GET Master Deposit
      .addCase(fetGetMasterDeposit.pending, (state) => {
        state.masterDepositStatus = "loading";
      })
      .addCase(fetGetMasterDeposit.fulfilled, (state, action) => {
        state.masterDepositStatus = "succeeded";
        state.masterDeposit = action.payload;
        state.depositMasterHistory =
          state.masterDeposit.data.allDepositDownline;
      })
      .addCase(fetGetMasterDeposit.rejected, (state, action) => {
        state.masterDepositStatus = "failed";
        state.masterDepositError = action.error.message;
      })

      //GET Deposit Upline
      .addCase(fetGetDepositUpline.pending, (state) => {
        state.depositUpLineStatus = "loading";
      })
      .addCase(fetGetDepositUpline.fulfilled, (state, action) => {
        state.depositUpLineStatus = "succeeded";
        state.depositUpLine = action.payload;
        //==================================================
        state.depositAdminHistory = state.depositUpLine.data.allDepositUpline;
      })
      .addCase(fetGetDepositUpline.rejected, (state, action) => {
        state.depositUpLineStatus = "failed";
        state.depositUpLineError = action.error.message;
      })

      //GET MasterDeposit Upline
      .addCase(fetGetMasterDepositUpline.pending, (state) => {
        state.masterDepositUpLineStatus = "loading";
      })
      .addCase(fetGetMasterDepositUpline.fulfilled, (state, action) => {
        state.masterDepositUpLineStatus = "succeeded";
        state.masterDepositUpLine = action.payload;

        state.depositMasterHistory =
          state.masterDepositUpLine.data.allDepositUpline;
      })
      .addCase(fetGetMasterDepositUpline.rejected, (state, action) => {
        state.masterDepositUpLineStatus = "failed";
        state.masterDepositUpLineError = action.error.message;
      })

      //GET AgentDeposit Upline
      .addCase(fetGetAgentDepositUpline.pending, (state) => {
        state.agentDepositUpLineStatus = "loading";
      })
      .addCase(fetGetAgentDepositUpline.fulfilled, (state, action) => {
        state.agentDepositUpLineStatus = "succeeded";
        state.agentDepositUpLine = action.payload;
      })
      .addCase(fetGetAgentDepositUpline.rejected, (state, action) => {
        state.agentDepositUpLineStatus = "failed";
        state.agentDepositUpLineError = action.error.message;
      });
  },
});

export const {
  setShowName,
  setShowDepoForm,
  setBankNameIds,
  setPostWithdraw,
  setPostDeposit,
} = bankApiSlice.actions;

export const selectBankCat = (state) => state.bank.bankCat;
export const selectPostBankCat = (state) => state.bank.postBankCat;
export const selectPostBankCatStatus = (state) => state.bank.postBankCatStatus;

export const selectPostBankName = (state) => state.bank.postBankName;
export const selectPostBankNameStatus = (state) =>
  state.bank.postBankNameStatus;

export const selectBankName = (state) => state.bank.bankName;
export const selectBankNameStatus = (state) => state.bank.bankNameStatus;

export const selectBankAcc = (state) => state.bank.bankAcc;
export const selectPostBankAcc = (state) => state.bank.postBankAcc;
export const selectPostBankAccStatus = (state) => state.bank.postBankAccStatus;

export const selectBankAnnounc = (state) => state.bank.bankAnnounc;
export const selectPatchBankAnnouncStatus = (state) =>
  state.bank.patchBankAnnouncStatus;
export const selectBankAnnouncStatus = (state) => state.bank.bankAnnouncStatus;

export const selectPatchBankAnnounc = (state) => state.bank.patchBankAnnounc;

export const selectClickName = (state) => state.bank.toDeposite.clickName;
export const selectClickBankNameId = (state) =>
  state.bank.toDeposite.clickBankNameId;
export const selectClickBankAcc = (state) => state.bank.toDeposite.clickBankAcc;
export const selectShowDepoForm = (state) => state.bank.toDeposite.showDepForm;

export const selectDepositStatus = (state) => state.bank.depositStatus;

export const selectBankType = (state) => state.bank.bankType;
export const selectPostBankType = (state) => state.bank.postBankType;
export const selectPostBankTypeStatus = (state) =>
  state.bank.postBankTypeStatus;

export const selectBankAccUpline = (state) => state.bank.bankAccUpline;

export const selectBankNameUpline = (state) => state.bank.bankNameUpline;

export const selectPostWithdraw = (state) => state.bank.postWithdraw;
export const selectPostDeposit = (state) => state.bank.postDeposit;

export const selectPostWithdrawStatus = (state) =>
  state.bank.postWithdrawStatus;
export const selectPostDepositStatus = (state) => state.bank.postDepositStatus;

export const selectWithdraw = (state) => state.bank.withdraw;
export const selectDeposit = (state) => state.bank.deposit;

export const selectWithdrawUpLine = (state) => state.bank.withdrawUpLine;
export const selectDepositUpLine = (state) => state.bank.depositUpLine;

export const selectAdminUpandDownHistory = (state) =>
  state.bank.admintDownandUpHistory;
export const selectMasterUpandDownHistory = (state) =>
  state.bank.masterDownandUpHistroy;
export const selectDepositAdminHistory = (state) =>
  state.bank.depositAdminHistory;
export const selectDepositMasterHistory = (state) =>
  state.bank.depositMasterHistory;

export const selectMasterWithdrawUpLine = (state) =>
  state.bank.masterWithdrawUpLine;
export const selectAgentWithdrawUpLine = (state) =>
  state.bank.agentWithdrawUpLine;
export const selectMasterDepositUpLine = (state) =>
  state.bank.masterDepositUpLine;
export const selectAgentDepositUpLine = (state) =>
  state.bank.agentDepositUpLine;

export const selectBankNameId = (state) => state.bank.toDeposite.bankNameId;

export const selectPatchDepositStatus = (state) =>
  state.bank.patchDepositStatus;
export const selectPatchWithdrawStatus = (state) =>
  state.bank.patchWithdrawStatus;
export const selectPatchWithdraw = (state) => state.bank.patchWithdraw;
export const selectPatchDeposit = (state) => state.bank.patchDeposit;

export default bankApiSlice.reducer;
