import { createSlice } from "@reduxjs/toolkit";

const days = [
  "Today",
  "Yesterday",
  "This week",
  "Last week",
  "This month",
  "Last month",
];

const agentReport = [
  "Agent Name",
  "Total Bet",
  "Total Win",
  "Player Win/Lose",
  "Agent Win/Lose",
  "Agent Commision",
  "Company",
  "RTP",
];

const userReport = [
  "User Name",
  "Total Bet",
  "Total Win",
  "Player Win/Lose",
  "Agent Win/Lose",
  "User Commision",
  "Company",
  "RTP",
];

const chartData = [
  { id: 1, year: 2017, win: 50000000, lose: 70000000, game: "Slot" },
  { id: 2, year: 2018, win: 10000000, lose: 50000000, game: "Livecasino" },
  { id: 3, year: 2019, win: 80000000, lose: 20000000, game: "Finishing" },
  { id: 4, year: 2020, win: 20000000, lose: 90000000, game: "3D" },
  { id: 5, year: 2021, win: 40000000, lose: 60000000, game: "Maung" },
  { id: 6, year: 2022, win: 30000000, lose: 80000000, game: "Body" },
  { id: 7, year: 2023, win: 70000000, lose: 30000000, game: "2D" },
];

const chartGameData = [
  { game: "Slot", win: 50000000 },
  { game: "Livecasino", win: 10000000 },
  { game: "Finishing", win: 80000000 },
  { game: "3D", win: 20000000 },
  { game: "Maung", win: 40000000 },
  { game: "Body", win: 30000000 },
  { game: "2D", win: 70000000 },
];

const user = [
  {
    id: 1,
    name: "Ar1111",
    bet: 20000,
    totalWin: 100000,
    pWinLose: 200000,
    agentWinLose: 10000,
    agent: 200000,
    com: 100000,
    rtp: "34%",
  },
  {
    id: 1,
    name: "Ar2222",
    bet: 20000,
    totalWin: 100000,
    pWinLose: 200000,
    agentWinLose: 10000,
    agent: 200000,
    com: 100000,
    rtp: "34%",
  },
];
const agentUser = [
  {
    id: 1,
    name: "agent-1",
    bet: 10000,
    totalWin: 100000,
    pWinLose: 100000,
    agentWinLose: 10000,
    agent: 100000,
    com: 100000,
    rtp: "34%",
    action: false,
    gameCat: [
      {
        name: "slotGame",
        bet: 10000,
        totalWin: 100000,
        pWinLose: 100000,
        agentWinLose: 10000,
        agent: 100000,
        com: 100000,
        rtp: "34%",
      },
      {
        name: "LiveCasino",
        bet: 10000,
        totalWin: 100000,
        pWinLose: 100000,
        agentWinLose: 10000,
        agent: 100000,
        com: 100000,
        rtp: "50%",
      },
    ],
  },
  {
    id: 2,
    name: "agent-2",
    bet: 10000,
    totalWin: 100000,
    pWinLose: 100000,
    agentWinLose: 10000,
    agent: 100000,
    com: 100000,
    rtp: "40%",
    action: false,
    gameCat: [
      {
        name: "slotGame",
        bet: 10000,
        totalWin: 100000,
        pWinLose: 100000,
        agentWinLose: 10000,
        agent: 100000,
        com: 100000,
        rtp: "10%",
      },
      {
        name: "LiveCasino",
        bet: 10000,
        totalWin: 100000,
        pWinLose: 100000,
        agentWinLose: 10000,
        agent: 100000,
        com: 100000,
        rtp: "30%",
      },
    ],
  },
];

const userDetailHead = [
  "Bet Time",
  "Result Time",
  "User Id",
  "Game Code",
  "Game Name",
  "Category",
  "SubCategory",
  "Before Balance",
  "Bet",
  "Win",
  "Win/Lose",
  "After Balance",
  "Status",
  "Detail",
  "Description",
];

const userDetail = [
  {
    betTime: "2023/10/14 18:18:37",
    resultTime: "2023/10/14 18:30:37",
    userID: "Ar1111",
    GameCode: "sport11",
    GameName: "sport11",
    Category: "slot",
    subCategory: "Pragmatic",
    bBalance: 5000,
    bet: 100,
    win: 1100,
    winLose: 1000,
    aBalance: 3000,
    status: "Bet",
    detail: "pragmatic.com",
    description: "slot",
  },
  {
    betTime: "2023/10/14 18:18:37",
    resultTime: "2023/10/14 18:30:37",
    userID: "Ar2222",
    GameCode: "sport11",
    GameName: "sport11",
    Category: "slot",
    subCategory: "Pragmatic",
    bBalance: 5000,
    bet: 100,
    win: 1100,
    winLose: 1000,
    aBalance: 3000,
    status: "Bet",
    detail: "pragmatic.com",
    description: "slot",
  },
];

const initialState = {
  agentReport,
  agentUser,
  days,
  userReport,
  user,
  userDetail,
  userDetailHead,
  chartData,
  chartChoose: "",
  chartGameData,
};
const winOrLoseSlice = createSlice({
  name: "winOrLose",
  initialState,
  reducers: {
    showAgentGame: (state, action) => {
      state.agentUser = state.agentUser.map((d) =>
        d.id === action.payload ? { ...d, action: !d.action } : d
      );
    },

    setChartChoose: (state, action) => {
      state.chartChoose = action.payload;
    },
  },
});

export const { showAgentGame, setChartChoose } = winOrLoseSlice.actions;
export const selectAgentReport = (state) => state.winOrLose.agentReport;
export const selectAgentUser = (state) => state.winOrLose.agentUser;
export const selectDays = (state) => state.winOrLose.days;
export const selectUserReport = (state) => state.winOrLose.userReport;
export const selectUser = (state) => state.winOrLose.user;
export const selectUserDetail = (state) => state.winOrLose.userDetail;
export const selectUserDetailHead = (state) => state.winOrLose.userDetailHead;
export const selectChartData = (state) => state.winOrLose.chartData;
export const selectChartChoose = (state) => state.winOrLose.chartChoose;
export const selectChartGameData = (state) => state.winOrLose.chartGameData;

export default winOrLoseSlice.reducer;
