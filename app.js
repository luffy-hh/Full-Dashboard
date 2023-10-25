const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const app = express();
app.use(cors());
const lottery2dRoutes = require("./2DAll/routes/lottery2dRoutes");

const userRouter = require("./users/userRoutes");
const userProfileRouter = require("./users/userProfileRoute");
const mainUnitRouter = require("./mainUnit/routes/mainUnitRoute");
const mainUnitHistories = require("./mainUnit/routes/mainUnitHistoryRoute");
const mainUnitTransfer = require("./mainUnit/routes/transferMainUnitRoute");
const gameCategoriesRouter = require("./gameCategories/routes/gameCategoryRoutes");
const gameSubCatRouter = require("./gameCategories/routes/gameSubCatRouters");
const lotterySettingRouter = require("./lotterySetting/routes/lotterySettingRoutes");
const container2DMorning12Router = require("./2dGames/routes/thai2DMorning12Routes");
const luckyNumbers2dRouter = require("./2DLuckyNumber/routes/2DLuckyNumberRoutes");
const lottery2dsale = require("./sales/routes/2dsaleroutes");
const thai2DBettingHistoriesRouter = require("./2DBettingHistories/routes/2DBettingHistoriesRoute");
const banktype = require("./bank/routes/bankTypeRoutes");
const bankName = require("./bank/routes/bankNameRoutes");
const bankAccount = require("./bank/routes/bankAccRoutes");
const bankAnnouncement = require("./bank/routes/bankAnnouncementRoute");

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
const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

// app.use(mongoSanitize());

// app.use(xss());
app.use(express.static("public"));
app.use(express.static("client"));

app.use((req, res, next) => {
  console.log("This is Test Middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

//Lottery
app.use("/api/v1/lottery2dthai12", lottery2dRoutes);

// User Register
app.use("/api/v1/user", userRouter);
app.use("/api/v1/userProfile", userProfileRouter);

//Bank Account
app.use("/api/v1/banktype", banktype);
app.use("/api/v1/bankName", bankName);
app.use("/api/v1/bankAcc", bankAccount);
app.use("/api/v1/bankAnnounc", bankAnnouncement);

// Main Unit
app.use("/api/v1/mainunit", mainUnitRouter);

//Lucky Numbers
app.use("/api/v1/luckyNumbers", luckyNumbers2dRouter);

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

//Lottery Container
app.use("/api/v1/thai2dmorning12", container2DMorning12Router);

//Lottery Sale
app.use("/api/v1/thai2dmorning12sale", lottery2dsale);

//2D Betting Histories
app.use("/api/v1/thai2dhistories", thai2DBettingHistoriesRouter);

//const root = path.join(__dirname, "client");
//app.get("*", (req, res) => {
//res.sendFile("index.html", { root });
//});
module.exports = app;
