import { configureStore } from "@reduxjs/toolkit";
import ShowHideReducer from "../Feactures/ShowHideSlice";
import AllUserPageReducer from "../Feactures/AllUserPageSlice";
import twoDapiReducer from "../Feactures/twoDapiSlice";
import StaticDataReducer from "../Feactures/StaticDataSlice";
import dataReducer from "../Feactures/apiSlice";
import adminTwodReducer from "../Feactures/adminTwodSlice";
import modalReducer from "../Feactures/modalSlice";
import winOrLoseReducer from "../Feactures/winOrLoseSlice";
import bankApiReducer from "../Feactures/bankApiSlice";
import shanReducer from "../Feactures/shan";
import slotReducer from "../Feactures/slotSlice";
export const store = configureStore({
  reducer: {
    shows: ShowHideReducer,
    userPageData: AllUserPageReducer,
    staticData: StaticDataReducer,
    data: dataReducer,
    adminTwoD: adminTwodReducer,
    twoDapi: twoDapiReducer,
    modal: modalReducer,
    winOrLose: winOrLoseReducer,
    bank: bankApiReducer,
    shan: shanReducer,
    slot: slotReducer,
  },
});
