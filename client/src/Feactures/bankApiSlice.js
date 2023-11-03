import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDataWithToken,
  postDataWithToken,
  postDataWithImg,
  patchDatas,
} from "../app/api";

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

const toDeposite = {
  bankNameList: null,
  showName: true,
  bankAccList: null,
  clickBankNameId: "",
  clickBankAcc: "",
  clickName: "",
  showDepForm: false,
};

const initialState = {
  toDeposite,
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
  postBankAcc: null,
  postBankAccStatus: "idle",
  postBankAccError: null,
  bankAnnounc: null,
  bankAnnouncStatus: "idle",
  bankAnnouncError: null,
  patchBankAnnounc: null,
  patchBankAnnouncStatus: "idle",
  patchBankAnnouncError: null,
  postDeposit: {},
  postDepositStatus: "idle",
  postDepositError: null,
  deposit: null,
  depositStatus: "idle",
  depositError: null,
};
const bankApiSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    filterBankNameList: (state, action) => {
      state.toDeposite.bankNameList = state.bankName.data.allBankName.filter(
        (d) => d.bankTypeId._id === action.payload.id
      );
    },

    filterBankAccList: (state, action) => {
      state.toDeposite.bankAccList = state.bankAcc.data.allBankAcc.filter(
        (d) => d.bankNameId._id === action.payload.id
      );
      state.toDeposite.clickBankAcc = action.payload.name;
      state.toDeposite.showName = false;
    },

    setShowName: (state, action) => {
      state.toDeposite.showName = action.payload;
    },

    setClickName: (state, action) => {
      state.toDeposite.clickName = action.payload.name;
      state.toDeposite.showDepForm = true;
      state.toDeposite.clickBankNameId = action.payload.id;
    },
  },
  extraReducers: (builder) => {
    builder
      //for bank type get method
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
      //for bank type post method
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
        state.toDeposite.bankNameList = state.bankName.data.allBankName;
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
        console.log(state.postDeposit);
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
      })
      .addCase(fetGetDeposit.rejected, (state, action) => {
        state.depositStatus = "failed";
        state.depositError = action.error.message;
      });
  },
});

export const {
  filterBankNameList,
  filterBankAccList,
  setShowName,
  setClickName,
} = bankApiSlice.actions;

export const selectBankType = (state) => state.bank.bankType;
export const selectPostBankType = (state) => state.bank.postBankType;
export const selectPostBankTypeStatus = (state) =>
  state.bank.postBankTypeStatus;

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
export const selectBankNameList = (state) => state.bank.toDeposite.bankNameList;
export const selectShowName = (state) => state.bank.toDeposite.showName;
export const selectBankAccList = (state) => state.bank.toDeposite.bankAccList;

export const selectClickName = (state) => state.bank.toDeposite.clickName;
export const selectClickBankNameId = (state) =>
  state.bank.toDeposite.clickBankNameId;
export const selectClickBankAcc = (state) => state.bank.toDeposite.clickBankAcc;
export const selectShowDepoForm = (state) => state.bank.toDeposite.showDepForm;

export const selectPostDeposit = (state) => state.bank.postDeposit;
export const selectPostDepositStatus = (state) => state.bank.postDepositStatus;

export const selectDeposit = (state) => state.bank.deposit;
export const selectDepositStatus = (state) => state.bank.depositStatus;
export default bankApiSlice.reducer;
