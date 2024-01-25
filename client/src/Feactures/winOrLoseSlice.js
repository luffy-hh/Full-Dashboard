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
  "Action",
  "User Id",
  "Game Name",
  "Type",
  "Provider",
  "Before",
  "Amoumt",
  "After",
  "Win/Lose",
];

const userDetailHeadEdit = [
  "Bet Time",
  "Action",
  "Player ID",
  "Game Name",
  "Game Type",
  "Provider Name",
  "Before Amount",
  "Bet Amount",
  "After Amount",
];

const userMiddleHead = [
  "User ID",
  "Game",
  "Type",
  "Provider",
  "Total Bet Count",
  "Total Bet Amount",
  "Total Win Amount",
  "Win/Lose",
];

const initialState = {
  agentReport,
  agentUser,
  days,
  userReport,
  userDetailHead,
  userMiddleHead,
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

export const selectUserDetailHead = (state) => state.winOrLose.userDetailHead;
export const selectChartData = (state) => state.winOrLose.chartData;
export const selectChartChoose = (state) => state.winOrLose.chartChoose;
export const selectChartGameData = (state) => state.winOrLose.chartGameData;
export const selectUserMiddleHead = (state) => state.winOrLose.userMiddleHead;

export default winOrLoseSlice.reducer;
