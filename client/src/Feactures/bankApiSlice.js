import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDataWithToken,
  postDataWithToken,
  postDataWithImg,
  patchDatas,
} from "../app/api";
import { startTransition } from "react";

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

const initialState = {
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
};
const bankApiSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {},
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
        console.log(state.postBankName);
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
        console.log(state.bankName);
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
        console.log(state.bankName);
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
      });
  },
});

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

export default bankApiSlice.reducer;
