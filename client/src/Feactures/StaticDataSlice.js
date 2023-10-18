import { createSlice } from "@reduxjs/toolkit";

const data = [
  {
    id: 1,
    route: "/",
    img: [
      "/img/asidebar/BurmeseGamesOff.png",
      "/img/asidebar/BurmeseGamesOn.png",
    ],
    active: false,
  },
  {
    id: 2,
    route: "fishing",
    img: ["/img/asidebar/FishingOff.png", "/img/asidebar/FishingOn.png"],
    active: false,
  },
  {
    id: 3,
    route: "liveCasnio",
    img: ["/img/asidebar/LiveCasnioOff.png", "/img/asidebar/LiveCasnioOn.png"],
    active: false,
  },
  {
    id: 4,
    route: "slot",
    img: ["/img/asidebar/SlotOff.png", "/img/asidebar/SlotOn.png"],
    active: false,
  },
  {
    id: 5,
    route: "sport",
    img: ["/img/asidebar/SportOff.png", "/img/asidebar/SportOn.png"],
    active: false,
  },
  {
    id: 6,
    route: "twothree",
    img: ["/img/asidebar/TwodThreedOff.png", "/img/asidebar/TwodThreedOn.png"],
    active: false,
  },
];

const twoDrecentData = [
  { no: "60", date: "14/6/2023(sun)", id: "1" },
  { no: "67", date: "15/6/2023(mon)", id: "2" },
  { no: "50", date: "16/6/2023(tue)", id: "3" },
  { no: "23", date: "17/6/2023(wed)", id: "4" },
  { no: "11", date: "18/6/2023(thu)", id: "5" },
  { no: "52", date: "19/6/2023(fri)", id: "6" },
];

const twoDRightSide = [
  { title: "Live", clicked: false },
  { title: "Hot Number", clicked: false },
  { title: "Lottery", clicked: false },
  { title: "2D list (Record)", clicked: false },
];

const twoDHostNoandProgess = [
  { id: 1, no: "50", hot: 50 },
  { id: 2, no: "54", hot: 30 },
  { id: 3, no: "80", hot: 60 },
  { id: 4, no: "20", hot: 90 },
  { id: 5, no: "50", hot: 75 },
  { id: 5, no: "50", hot: 50 },
  { id: 6, no: "39", hot: 30 },
  { id: 7, no: "44", hot: 60 },
  { id: 8, no: "79", hot: 90 },
  { id: 9, no: "50", hot: 46 },
  { id: 10, no: "23", hot: 50 },
  { id: 12, no: "20", hot: 30 },
  { id: 13, no: "50", hot: 60 },
  { id: 14, no: "70", hot: 90 },
  { id: 15, no: "29", hot: 80 },
  { id: 16, no: "50", hot: 30 },
  { id: 17, no: "50", hot: 60 },
  { id: 18, no: "11", hot: 90 },
  { id: 19, no: "45", hot: 85 },
];

const user2D = { clickedNo: null, amount: "", list: [], listHistory: false };

const userLotteryClick = {
  firstNo: null,
  secondNo: null,
  amount: "",
  list: [],
  listHistory: false,
};

const lotteryRight = {
  right: ["ကြီး", "ငယ်", "မ", "စုံ", "စုံစုံ", "စုံမ", "မမ", "အပူး"],
  clickNoList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
};




const changetwoDpage = {
  showRecent: true,
  recentTwoDNo: twoDrecentData,
  twoDRightSide,
  twodOpacity: true,
  hotNoandProgess: twoDHostNoandProgess,
  user2DClicked: user2D,
  lotteryRight,
  userLotteryClick,
};

const burmesGame = [
  { id: 1, img: "/img/burmesGame/slote1.jpg" },
  { id: 2, img: "/img/burmesGame/slote2.jpg" },
  { id: 3, img: "/img/burmesGame/slote3.jpg" },
  { id: 4, img: "/img/burmesGame/slote4.jpg" },
  { id: 5, img: "/img/burmesGame/slote5.jpg" },
  { id: 6, img: "/img/burmesGame/slote6.jpg" },
  { id: 7, img: "/img/burmesGame/slote7.jpg" },
  { id: 8, img: "/img/burmesGame/slote8.jpg" },
  { id: 9, img: "/img/burmesGame/slote9.jpg" },
  { id: 10, img: "/img/burmesGame/slote10.jpg" },
  { id: 11, img: "/img/burmesGame/slote11.jpg" },
  { id: 12, img: "/img/burmesGame/slote12.jpg" },
];

const searchQuery = { filterUnitHistory: [] };
const burmesGamePage = { burmesGame };

const initialState = {
  asideBar: data,
  forTwoD: changetwoDpage,
  burmesGamePage,
  searchQuery,

};

const StaticDataSlice = createSlice({
  name: "staticData",
  initialState,
  reducers: {
    //for aside bar
    changeBtnImg: (state, action) => {
      state.asideBar = state.asideBar.map((s) =>
        s.id === action.payload.id
          ? { ...s, active: !s.active }
          : { ...s, active: false }
      );
    },

    //for 2d and 3d page want to change to recent page
    setShowRecent: (state) => {
      state.forTwoD.showRecent = !state.forTwoD.showRecent;
    },

    //for live, hot number, 2d record fun
    clickTwoDRightBtn: (state, action) => {
      state.forTwoD.twoDRightSide = state.forTwoD.twoDRightSide.map((s) =>
        s.title === action.payload.title ? { ...s, clicked: true } : s
      );

      state.forTwoD.twodOpacity = false;
    },

    //for hotnumber, live,3d/3d back
    backRecentRightBtn: (state) => {
      state.forTwoD.twoDRightSide = state.forTwoD.twoDRightSide.map((s) =>
        s.clicked === true ? { ...s, clicked: false } : s
      );

      state.forTwoD.twodOpacity = true;
    },

    //back 2d recent page
    backRecent: (state) => {
      state.forTwoD.twodOpacity = true;
    },

    //============for 2D user clicked  fun===========
    setClickedNo: (state, action) => {
      state.forTwoD.user2DClicked.clickedNo = action.payload;
    },

    setAmount: (state, action) => {
      state.forTwoD.user2DClicked.amount = action.payload;
    },

    setAddList: (state, action) => {
      state.forTwoD.user2DClicked.list.push(action.payload);
      state.forTwoD.user2DClicked.clickedNo = null;
      state.forTwoD.user2DClicked.amount = "";
    },

    clickListHistory: (state) => {
      state.forTwoD.user2DClicked.listHistory =
        !state.forTwoD.user2DClicked.listHistory;
    },

    //for lottery button
    setClickedFirst: (state, action) => {
      state.forTwoD.userLotteryClick.firstNo = action.payload;
    },

    setClickedSecond: (state, action) => {
      state.forTwoD.userLotteryClick.secondNo = action.payload;
    },

    setLotteryAmount: (state, action) => {
      state.forTwoD.userLotteryClick.amount = action.payload;
    },

    setAddLotteryList: (state, action) => {
      state.forTwoD.userLotteryClick.list.push(action.payload);
      state.forTwoD.userLotteryClick.firstNo = null;
      state.forTwoD.userLotteryClick.secondNo = null;
      state.forTwoD.userLotteryClick.amount = "";
    },

    clickLotteryListHistory: (state) => {
      state.forTwoD.userLotteryClick.listHistory =
        !state.forTwoD.userLotteryClick.listHistory;
    },

    setFilterUnitHistory: (state, action) => {
      state.searchQuery.filterUnitHistory.push(...action.payload);
    },

  },
});

export const {
  changeBtnImg,
  setShowRecent,
  clickTwoDRightBtn,
  backRecent,
  backRecentRightBtn,
  setClickedNo,
  setAmount,
  setAddList,
  clickListHistory,
  setClickedFirst,
  setClickedSecond,
  setLotteryAmount,
  setAddLotteryList,
  clickLotteryListHistory,
  setFilterUnitHistory,
  
} = StaticDataSlice.actions;

//serach query
export const selectFilterUnitHistory = (state) =>
  state.staticData.searchQuery.filterUnitHistory;
export const asideData = (state) => state.staticData.asideBar;
export const showRecent = (state) => state.staticData.forTwoD.showRecent;

export const twoDrecntNos = (state) => state.staticData.forTwoD.recentTwoDNo;

export const twoDRight = (state) => state.staticData.forTwoD.twoDRightSide;

export const twoDrecntOpactiy = (state) => state.staticData.forTwoD.twodOpacity;
export const hotNoandProgessArr = (state) =>
  state.staticData.forTwoD.hotNoandProgess;

//for host number ||  live || 2d list || show or hide
export const showLive = (state) =>
  state.staticData.forTwoD.twoDRightSide[0].clicked;
export const showHotNumber = (state) =>
  state.staticData.forTwoD.twoDRightSide[1].clicked;
export const showLottery = (state) =>
  state.staticData.forTwoD.twoDRightSide[2].clicked;
export const show2Dlist = (state) =>
  state.staticData.forTwoD.twoDRightSide[3].clicked;

//for user clicked 2D Number and List
export const clickedNos = (state) =>
  state.staticData.forTwoD.user2DClicked.clickedNo;
export const amounts = (state) => state.staticData.forTwoD.user2DClicked.amount;

export const lists = (state) => state.staticData.forTwoD.user2DClicked.list;
export const listHistorys = (state) =>
  state.staticData.forTwoD.user2DClicked.listHistory;

//for lottery button
export const selectLotteryRight = (state) =>
  state.staticData.forTwoD.lotteryRight.right;

export const selectClickNoList = (state) =>
  state.staticData.forTwoD.lotteryRight.clickNoList;

export const selectLotteryList = (state) =>
  state.staticData.forTwoD.userLotteryClick.list;
export const selectLotteryAmount = (state) =>
  state.staticData.forTwoD.userLotteryClick.amount;

export const selectLotteryFirstNo = (state) =>
  state.staticData.forTwoD.userLotteryClick.firstNo;
export const selectLotterySecondNo = (state) =>
  state.staticData.forTwoD.userLotteryClick.secondNo;
export const selectLotteryClickHistory = (state) =>
  state.staticData.forTwoD.userLotteryClick.listHistory;

//for burmese page ===========================================
export const selectBurmesData = (state) =>
  state.staticData.burmesGamePage.burmesGame;

//game Categories



export default StaticDataSlice.reducer;
