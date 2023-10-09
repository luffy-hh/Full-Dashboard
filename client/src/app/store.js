import { configureStore } from "@reduxjs/toolkit";
import ShowHideReducer from "../Feactures/ShowHideSlice";
import AllUserPageReducer from "../Feactures/AllUserPageSlice";
import twoDapiReducer from "../Feactures/twoDapiSlice";
import StaticDataReducer from "../Feactures/StaticDataSlice";
import dataReducer from "../Feactures/apiSlice";
import adminTwodReducer from "../Feactures/adminTwodSlice";
export const store = configureStore({
  reducer: {
    shows: ShowHideReducer,
    userPageData: AllUserPageReducer,
    staticData: StaticDataReducer,
    data: dataReducer,
    adminTwoD: adminTwodReducer,
    twoDapi: twoDapiReducer,
  },
});
