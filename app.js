const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());
const lottery2dRoutes = require("./2DAll/routes/lottery2dRoutes");
const userRoleRouter = require("./userRoles/userRolesRoute");
const userRouter = require("./users/userRoutes");
const userProfileRouter = require("./users/userProfileRoute");
const mainUnitRouter = require("./mainUnit/routes/mainUnitRoute");
const mainUnitHistories = require("./mainUnit/routes/mainUnitHistoryRoute");
const mainUnitTransfer = require("./mainUnit/routes/transferMainUnitRoute");
const gameCategoriesRouter = require("./gameCategories/routes/gameCategoryRoutes");
const gameSubCatRouter = require("./gameCategories/routes/gameSubCatRouters");
const lotterySettingRouter = require("./lotterySetting/routes/lotterySettingRoutes");

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static("static"));

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

// User Role
app.use("/api/v1/userRole", userRoleRouter);

// User Register
app.use("/api/v1/user", userRouter);
app.use("/api/v1/userProfile", userProfileRouter);

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});
module.exports = app;
