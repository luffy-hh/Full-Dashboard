import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const conDition = { condition: "" };
const depositeToUser = {
  userId: "",
  amount: "",
  withdrawAmount: "",
  descr: "",
};
const modalShowHide = {
  modalShow: false,
  modalSupGameCat: false,
  modalLucky: false,
  modalDeposite: false,
  modalDifDepo: false,
  modalAccDepo: false,
  modalUserDetail: false,
  modalGameAction: false,
  modalDetail: false,
  modalReport: false,
  modalChangePassword: false,
  modalCloseNo: false,
  modalMasterSubGame: false,
};

const initialState = {
  modalShowHide,
  depositeToUser,
  conDition,
  userDetailData: null,
  closeNoData: null,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalShow: (state, action) => {
      state.modalShowHide.modalShow = action.payload;
    },

    setModalSupGameCat: (state, action) => {
      state.modalShowHide.modalSupGameCat = action.payload;
    },

    setUserId: (state, action) => {
      state.depositeToUser.userId = action.payload;
    },

    setCondition: (state, action) => {
      state.conDition.condition = action.payload;
    },

    setAmount: (state, action) => {
      state.depositeToUser.amount = action.payload;
    },
    setWithDrawAmount: (state, action) => {
      state.depositeToUser.withdrawAmount = action.payload;
    },
    setDescr: (state, action) => {
      state.depositeToUser.descr = action.payload;
    },

    setModalLucky: (state, action) => {
      state.modalShowHide.modalLucky = action.payload;
    },

    setModalDeposite: (state, action) => {
      state.modalShowHide.modalDeposite = action.payload;
    },
    setModalDifDepo: (state, action) => {
      state.modalShowHide.modalDifDepo = action.payload;
    },
    setModalAccDepo: (state, action) => {
      state.modalShowHide.modalAccDepo = action.payload;
    },

    setModalUserDetail: (state, action) => {
      state.modalShowHide.modalUserDetail = action.payload;
    },

    setModalGameAction: (state, action) => {
      state.modalShowHide.modalGameAction = action.payload;
    },

    setModalDetail: (state, action) => {
      state.modalShowHide.modalDetail = action.payload;
    },

    setModalReport: (state, action) => {
      state.modalShowHide.modalReport = action.payload;
    },

    setModalChangePassword: (state, action) => {
      state.modalShowHide.modalChangePassword = action.payload;
    },

    setUserDetailData: (state, action) => {
      state.userDetailData = action.payload;
    },

    setCloseNoData: (state, action) => {
      state.closeNoData = action.payload;
    },
    setModalCloseNo: (state, action) => {
      state.modalShowHide.modalCloseNo = action.payload;
    },
    setModalMasterSubGame: (state, action) => {
      state.modalShowHide.modalMasterSubGame = action.payload;
    },
  },
});

export const {
  setModalShow,
  setUserId,
  setCondition,
  setAmount,
  setWithDrawAmount,
  setModalSupGameCat,
  setModalLucky,
  setModalDeposite,
  setModalDifDepo,
  setModalAccDepo,
  setModalUserDetail,
  setUserDetailData,
  setModalDetail,
  setModalGameAction,
  setModalReport,
  setModalChangePassword,
  setModalCloseNo,
  setCloseNoData,
  setModalMasterSubGame,
  setDescr,
} = modalSlice.actions;
export const selectModalShow = (state) => state.modal.modalShowHide.modalShow;
export const selectUserId = (state) => state.modal.depositeToUser.userId;
export const selectDepositeAmount = (state) =>
  state.modal.depositeToUser.amount;
export const selectWithDrawAmount = (state) =>
  state.modal.depositeToUser.withdrawAmount;
export const selectCondition = (state) => state.modal.conDition.condition;
export const selectModalSupGameCat = (state) =>
  state.modal.modalShowHide.modalSupGameCat;
export const selectModalLucky = (state) => state.modal.modalShowHide.modalLucky;
export const selectModalDeposite = (state) =>
  state.modal.modalShowHide.modalDeposite;

export const selectModalDiffDepo = (state) =>
  state.modal.modalShowHide.modalDifDepo;
export const selectModalAccDepo = (state) =>
  state.modal.modalShowHide.modalAccDepo;

export const selectModalUserDetail = (state) =>
  state.modal.modalShowHide.modalUserDetail;
export const selectUserDetailData = (state) => state.modal.userDetailData;
export const selectModalGameAction = (state) =>
  state.modal.modalShowHide.modalGameAction;
export const selectModalDetail = (state) =>
  state.modal.modalShowHide.modalDetail;

export const selectModalReport = (state) =>
  state.modal.modalShowHide.modalReport;
export const selectModalChangePassword = (state) =>
  state.modal.modalShowHide.modalChangePassword;

export const selectModalCloseNo = (state) =>
  state.modal.modalShowHide.modalCloseNo;

export const selectCloseNoData = (state) => state.modal.closeNoData;

export const selectModalMasterSubGame = (state) =>
  state.modal.modalShowHide.modalMasterSubGame;

export const selectDescr = (state) => state.modal.depositeToUser.descr;

export default modalSlice.reducer;
