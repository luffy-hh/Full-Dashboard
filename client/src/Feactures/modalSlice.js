import { createSlice } from "@reduxjs/toolkit";

const modalShowHide = { modalShow: false };

const initialState = { modalShowHide };
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalShow: (state, action) => {
      state.modalShowHide.modalShow = action.payload;
    },
  },
});

export const { setModalShow } = modalSlice.actions;
export const selectModalShow = (state) => state.modal.modalShowHide.modalShow;
export default modalSlice.reducer;
