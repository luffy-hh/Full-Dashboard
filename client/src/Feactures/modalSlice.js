import { createSlice } from "@reduxjs/toolkit";

const conDition = { condition: "" };
const depositeToUser = { userId: "", amount: "", withdrawAmount: "" };
const modalShowHide = {
  modalShow: false,
  modalSupGameCat: false,
  modalLucky: false,
  modalDeposite: false,
  modalDifDepo: false,
  modalAccDepo: false,
};

const initialState = { modalShowHide, depositeToUser, conDition };
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
export default modalSlice.reducer;
