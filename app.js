const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const app = express();
app.use(cors());

const userRouter = require("./users/userRoutes");
const userProfileRouter = require("./users/userProfileRoute");
const downlineUser = require("./users/downlineUserRoutes");
const mainUnitRouter = require("./mainUnit/routes/mainUnitRoute");
const mainUnitHistories = require("./mainUnit/routes/mainUnitHistoryRoute");
const mainUnitTransfer = require("./mainUnit/routes/transferMainUnitRoute");
const gameCategoriesRouter = require("./gameCategories/routes/gameCategoryRoutes");
const gameSubCatRouter = require("./gameCategories/routes/gameSubCatRouters");
const lotterySettingRouter = require("./lotteryFilterSetting/routes/lotteryFilterSettingRoutes");
const lottery2dsaleRoute = require("./2dSales/routes/2dsaleroutes");
const bankCategory = require("./bank/routes/bankCatRoutes");
const banktype = require("./bank/routes/bankTypeRoutes");
const bankName = require("./bank/routes/bankNameRoutes");
const bankAccount = require("./bank/routes/bankAccRoutes");
const bankAccountMe = require("./bank/routes/bankAccMeRoutes");
const bankAccountUpline = require("./bank/routes/bankAccUplineRoutes");
const bankAnnouncement = require("./bank/routes/bankAnnouncementRoute");
const showDepositBankAcc = require("./bank/routes/showDepositAccRoutes");
const bankNameUpline = require("./bank/routes/bankNameRoutes");

const withdarw = require("./withdrawl/routes/withdrawRoutes");
const withdrawDownline = require("./withdrawl/routes/withdrawDownlineRoutes");
const withdrawUpline = require("./withdrawl/routes/withdrawUplineRoutes");
const withdarwAdmin = require("./withdrawl/routes/withdrawAdminRoutes");

const deposit = require("./deposit/routes/depositRoutes");
const depositDownline = require("./deposit/routes/depositDownlineRoutes");
const depositUpline = require("./deposit/routes/depositUplineRoutes");
const depositAdmin = require("./deposit/routes/depositAdminRoutes");
const allUserCount = require("./users/allUserCountRoutes");
const twoDLuckyRoute = require("./2DLuckySetting/routes/TwoDLuckiesRoute");
const luckyWinnerRoute = require("./2DLuckySetting/routes/LuckyWinnerRoute");
const masterCatStatusAdmin = require("./category_status/routes/master_cat_status_routes");
const masterSubCatStatusAdmin = require("./category_status/routes/master_subcat_status_routes");
const agentCatStatusAdmin = require("./category_status/routes/agent_cat_status_routes");
const agentSubCatStatusAdmin = require("./category_status/routes/agent_subcat_status_route");
const agentSubCatComessionAdmin = require("./category_status/routes/agent_comession_rotes");
//3D
const thai3DNumRouter = require("./lottery_nuumbers/routes/lottery3dRoute");
const thai3DRouter = require("./3DSales&History/routes/3DSaleRoutes");
const thai3DLuckyNumRouter = require("./3dLucky&Winner/routes/3DLuckyNumRoutes");
const thai3DLuckyWinnerRouter = require("./3dLucky&Winner/routes/3DLuckyWinnerRoutes");
// Shan
const shanRole = require("./shan/shan_role/shanRoleRoute");
const shanTable = require("./shan/shan_table/shanTableRoute");
// const shanPlay = require("./shan/shan_play/routes");

//transaction record
const transactionRecordRouter = require('./transaction-record/transactionRecordRoute')

// Transfer and Change
const transferTo = require("./transition/routes/transitionsRoutes");
const changeTo = require("./transition/routes/changeUnitRoutes");
//Lottery Numbers
const lottery2dRoutes = require("./lottery_nuumbers/routes/lottery2dRoutes");
const lottery2dEveningRoutes = require("./lottery_nuumbers/routes/lottery2dEveningRoute");

// App Things
const appThingsRouter = require('./app_things/appThingsRoute')
//GameSoft
const gameSoftGetBalance = require("./game_soft/get_balance/getBalanceRoutes");
//Infinity Game
// const infinityGameCreatePlayer = require("./infinity_games/create_player/createPlayerRoutes");
// const infinityGetGameList = require("./infinity_games/game_list/gamelistRoutes");
// const infinityGameLogin = require("./infinity_games/game_login/gameLoginRoutes");
// const infinityGameDeposit = require("./infinity_games/game_deposit/gameDepositRoutes");
// const infinityGameCheckBalance = require("./infinity_games/check_balance/checkBalanceRoutes");
// const infinityGameWithdraw = require("./infinity_games/game_withdraw/gameWithdrawRoutes");
// const infinityGamePullLog = require("./infinity_games/pull_log/pull_logRoutes");
// const infinityGameCheckPlayer = require("./infinity_games/infinity_check_user/infinityCheckUserRoutes");
// Middleware
// app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  res.setHeader(
      "Content-Security-Policy",
      "connect-src 'self' https://gamevegas.online"
  );
  next();
});
//const limiter = rateLimit({
//max: 100,
//windowMs: 60 * 60 * 1000,
//message: "Too many request from this IP, please try again in an hour!",
//});

//app.use("/api", limiter);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(express.json());

// app.use(mongoSanitize());

// app.use(xss());

app.use(express.static("public"));

//app.use((req, res, next) => {
//console.log("This is Test Middleware");
//next();
//});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

//Lottery - For Admin and User
app.use("/api/v1/lottery2dthai12", lottery2dRoutes);
app.use("/api/v1/lottery2dThai4:30", lottery2dEveningRoutes);

// User Register
app.use("/api/v1/user", userRouter);
app.use("/api/v1/userProfile", userProfileRouter);
app.use("/api/v1/userCounts", allUserCount);

//Bank Account
app.use("/api/v1/bankcat", bankCategory);
app.use("/api/v1/banktype", banktype);
app.use("/api/v1/bankName", bankName);
app.use("/api/v1/bankAcc", bankAccount);
app.use("/api/v1/bankAccMe", bankAccountMe);
app.use("/api/v1/backAccUpline", bankAccountUpline);
app.use("/api/v1/bankNameUpline", bankNameUpline);

// Withdarw
app.use("/api/v1/withdarw", withdarw);
app.use("/api/v1/withdarwDownline", withdrawDownline);
app.use("/api/v1/withdarwUpline", withdrawUpline);
app.use("/api/v1/withdarwAdmin", withdarwAdmin);

// Deposit
app.use("/api/v1/deposit", deposit);
app.use("/api/v1/depositDownline", depositDownline);
app.use("/api/v1/depositUpline", depositUpline);
app.use("/api/v1/depositAdmin", depositAdmin);

app.use("/api/v1/bankAnnounc", bankAnnouncement);
app.use("/api/v1/showDepositBankAcc", showDepositBankAcc);

// Main Unit
app.use("/api/v1/mainunit", mainUnitRouter);

// Main  Unit History
app.use("/api/v1/mainunithistories", mainUnitHistories);

//Main Unit Transfer
app.use("/api/v1/mainunitstransfer", mainUnitTransfer);

//Game Categoires
app.use("/api/v1/gamecat", gameCategoriesRouter);

//Game Sub Categoires
app.use("/api/v1/gamesubcat", gameSubCatRouter);

//Lottery Setting
app.use("/api/v1/lotterysetting", lotterySettingRouter);

app.use("/api/v1/downlineUser", downlineUser);
//Lottery Container
// app.use("/api/v1/thai2dmorning12", container2DMorning12Router);

//Lottery Sale
app.use("/api/v1/thai2dsale", lottery2dsaleRoute);

// 2D lucky
app.use("/api/v1/twoDLucky", twoDLuckyRoute);
// 2D winners
app.use("/api/v1/thai2DLuckyWinners", luckyWinnerRoute);

//Game Cat and Sub Cat Status
app.use("/api/v1/mastercatstatus", masterCatStatusAdmin);
app.use("/api/v1/mastersubcatstatus", masterSubCatStatusAdmin);

app.use("/api/v1/agentcatstatus", agentCatStatusAdmin);
app.use("/api/v1/agentsubcatstatus", agentSubCatStatusAdmin);

//app.use("/api/v1/agentsubcatcomession", agentSubCatComessionAdmin);

// // Shan API
app.use("/api/v1/shanrole", shanRole);
app.use("/api/v1/shantable", shanTable);
// app.use("/api/v1/shanPlay", shanPlay);

// Transition
app.use("/api/v1/transferTo", transferTo);
app.use("/api/v1/changeTo", changeTo);

// transactionRecord
app.use('/api/v1/transaction-record',transactionRecordRouter)

// App Things
app.use("/api/v1/things", appThingsRouter)
// // Infinity game
// app.use("/api/v1/infinity", infinityGameCreatePlayer);
// app.use("/api/v1/infinity", infinityGetGameList);
// app.use("/api/v1/infinity", infinityGameLogin);
// app.use("/api/v1/infinity", infinityGameDeposit);
// app.use("/api/v1/infinity", infinityGameWithdraw);
// app.use("/api/v1/infinity", infinityGameCheckBalance);
// app.use("/api/v1/infinity", infinityGamePullLog);
// app.use("/api/v1/infinity", infinityGameCheckPlayer);
// 3D APIS
app.use("/api/v1/thai3DNumAll", thai3DNumRouter);
app.use("/api/v1/thai3D", thai3DRouter);
app.use("/api/v1/thai3DLuckyNum", thai3DLuckyNumRouter);
app.use("/api/v1/thai3DLuckyWinner", thai3DLuckyWinnerRouter);

// GameSoft API
app.use("/api/v1/gamesoft", gameSoftGetBalance);
// slot testing
// app.use("/api/v1/slotTest", slotTestRouter);
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "static/index.html"));
// });
module.exports = app;
