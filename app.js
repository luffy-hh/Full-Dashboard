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
const mainUnitRouter = require("./mainUnit/routes/mainUnitRoute");
const mainUnitHistories = require("./mainUnit/routes/mainUnitHistoryRoute");
const mainUnitTransfer = require("./mainUnit/routes/transferMainUnitRoute");
const gameCategoriesRouter = require("./gameCategories/routes/gameCategoryRoutes");
const gameSubCatRouter = require("./gameCategories/routes/gameSubCatRouters");
const lotterySettingRouter = require("./lotteryFilterSetting/routes/lotteryFilterSettingRoutes");
// const container2DMorning12Router = require("./2dGames/routes/thai2DMorning12Routes");
const lottery2dsale = require("./2dSales/routes/2dsaleroutes");
const bankCategory = require("./bank/routes/bankCatRoutes");
const bankAccountMe = require("./bank/routes/bankAccMeRoutes");
const bankAccountUpline = require("./bank/routes/bankAccUplineRoutes");
const banktype = require("./bank/routes/bankTypeRoutes");
const bankName = require("./bank/routes/bankNameRoutes");
const bankAccount = require("./bank/routes/bankAccRoutes");
const bankAnnouncement = require("./bank/routes/bankAnnouncementRoute");
const allUserCount = require("./users/allUserCountRoutes");
const showDepositBankAcc = require("./bank/routes/showDepositAccRoutes");
const masterCatStatusAdmin = require("./category_status/routes/master_cat_status_routes");
const masterSubCatStatusAdmin = require("./category_status/routes/master_subcat_status_routes");
const agentCatStatusAdmin = require("./category_status/routes/agent_cat_status_routes");
const agentSubCatStatusAdmin = require("./category_status/routes/agent_subcat_status_route");
const deposit = require("./deposit/routes/depositRoutes");

//Lottery Numbers
const lottery2dRoutes = require("./lottery_nuumbers/routes/lottery2dRoutes");

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
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

// app.use(mongoSanitize());

// app.use(xss());

app.use(express.static("public"));

app.use((req, res, next) => {
  console.log("This is Test Middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

//Lottery - For Admin
app.use("/api/v1/lottery2dthai12", lottery2dRoutes);
app.use("/api/v1/showDepositBankAcc", showDepositBankAcc);
app.use("/api/v1/deposit", deposit);
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
app.use("/api/v1/bankAnnounc", bankAnnouncement);

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

//Lottery Container
// app.use("/api/v1/thai2dmorning12", container2DMorning12Router);

//Lottery Sale
app.use("/api/v1/thai2dsale", lottery2dsale);

//Game Cat and Sub Cat Status
app.use("/api/v1/mastercatstatus", masterCatStatusAdmin);
app.use("/api/v1/mastersubcatstatus", masterSubCatStatusAdmin);

app.use("/api/v1/agentcatstatus", agentCatStatusAdmin);
app.use("/api/v1/agentsubcatstatus", agentSubCatStatusAdmin);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});
module.exports = app;
