import { createSlice } from "@reduxjs/toolkit";

const searchQuery = {
  unitHistoryQuery: "",
  allUserQuery: "",
  twoDQuery: "",
  masterQuery: "",
  agentQuery: "",
};

const depositeRule = {
  textOne: false,
  text: `ငွေထုတ်လိုသည့်Accကိုရွေးပေးပါ၊ ငွေထုတ်လိုသည့်Acc နံပါတ်ကိုမှန်ကန်အောင်ရိုက်ထည့်ပေးပါ၊ ငွေထုတ်ပီး(5)မိနစ်အတွင်းAccထဲငွေရောက်ပါမည်။ ငွေထုတ်(၁၀၀၀၀)ကျပ်မှစတင်ထုတ်နိုင်ပါသည်။`,
  textTwoShow: false,
  textTwo: `ကျေးဇူးပြု၍ သတ်မှတ်ထားသောနံပါတ်သို့ ငွေလွှဲပြီးငွေလွဲပြေစာမှIDနောက်ဆုံး(6)လုံးဖြင့် ငွေဖြည့်Order တင်ပေးပါ။ ငွေလွဲIDမှန်ကန်မှုမရှိပါကAccထဲသို့ငွေရောက်ရှိရန်နောက်​ကျခြင်းများဖြစ်ပေါ်စေပါသည်။
 (မှတ်ချက်) ငွေသွင်း (၁၀၀၀)ကျပ်မှစတင်ဖြည့်သွင်းလို့ရပါမည်။`,
};

const initialState = {
  show: false,
  report: true,
  master: true,
  user: true,
  admin: true,
  agent: true,
  searchQuery,
  depositeRule,
  showDropDown: false,
  downLineMaster: true,
  downLineAgent: true,
};

const ShowHideSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    clicked: (state) => {
      state.show = !state.show;
    },

    // for report 2d page state
    reportFun: (state, action) => {
      state.report = action.payload.bool;
    },

    //for master page state
    masterFun: (state) => {
      state.master = !state.master;
    },

    //for downline master
    setDownLineMaster: (state) => {
      state.downLineMaster = !state.downLineMaster;
    },

    setDownLineAgent: (state) => {
      state.downLineAgent = !state.downLineAgent;
    },

    //for user form show
    userFun: (state) => {
      state.user = !state.user;
    },

    //for create admin form show
    adminFun: (state) => {
      state.admin = !state.admin;
    },

    //for create agent form show
    agentFun: (state) => {
      state.agent = !state.agent;
    },

    //search Bar state
    setUnitHistoryQuery: (state, action) => {
      state.searchQuery.unitHistoryQuery = action.payload;
    },

    setAllUserQuery: (state, action) => {
      state.searchQuery.allUserQuery = action.payload;
    },
    setMasterQuery: (state, action) => {
      state.searchQuery.masterQuery = action.payload;
    },
    setAgentQuery: (state, action) => {
      state.searchQuery.agentQuery = action.payload;
    },

    setTwoDQuery: (state, action) => {
      state.searchQuery.twoDQuery = action.payload;
    },

    setTextOne: (state) => {
      state.depositeRule.textOne = !state.depositeRule.textOne;
    },
    setText: (state, action) => {
      state.depositeRule.text = action.payload;
    },

    setTextTwoShow: (state) => {
      state.depositeRule.textTwoShow = !state.depositeRule.textTwoShow;
    },

    setTextTwo: (state, action) => {
      state.depositeRule.textTwo = action.payload;
    },

    setShowDropDown: (state) => {
      state.showDropDown = !state.showDropDown;
    },
  },
});

export const {
  clicked,
  reportFun,
  masterFun,
  userFun,
  adminFun,
  setAllUserQuery,
  setUnitHistoryQuery,
  setAgentQuery,
  setMasterQuery,
  setTwoDQuery,
  setTextOne,
  setText,
  setTextTwoShow,
  setTextTwo,
  agentFun,
  setShowDropDown,
  setDownLineAgent,
  setDownLineMaster,
} = ShowHideSlice.actions;

export const nestBool = (state) => state.shows.show;
export const reportBool = (state) => state.shows.report;
export const masterBool = (state) => state.shows.master;
export const userBool = (state) => state.shows.user;
export const adminBool = (state) => state.shows.admin;
export const selectAgent = (state) => state.shows.agent;

export const selectShowDwonLineAgent = (state) => state.shows.downLineAgent;
export const selectShowDownLineMaster = (state) => state.shows.downLineMaster;

//serachbar state
export const selectAllUserQuery = (state) =>
  state.shows.searchQuery.allUserQuery;

export const selectUnitHistoryQuery = (state) =>
  state.shows.searchQuery.unitHistoryQuery;

export const selectMasterQuery = (state) => state.shows.searchQuery.masterQuery;

export const selectAgentQuery = (state) => state.shows.searchQuery.agentQuery;

export const selectTwoDQuery = (state) => state.shows.searchQuery.twoDQuery;

//deposite rule
export const selectTextOne = (state) => state.shows.depositeRule.textOne;
export const selectText = (state) => state.shows.depositeRule.text;

export const selectTextTwoShow = (state) =>
  state.shows.depositeRule.textTwoShow;
export const selectTextTwo = (state) => state.shows.depositeRule.textTwo;
export const selectShowDropDown = (state) => state.shows.showDropDown;

export default ShowHideSlice.reducer;
