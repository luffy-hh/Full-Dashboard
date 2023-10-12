const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();

const lottery2dRoutes = require("./2DAll/routes/lottery2dRoutes");
const userRoleRouter = require("./userRoles/userRolesRoute");
const userRouter = require("./users/userRoutes");
const mainUnitRouter = require("./mainUnit/routes/mainUnitRoute");
const mainUnitHistories = require("./mainUnit/routes/mainUnitHistoryRoute");

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log("This is Test Middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.header);
  next();
});

//Lottery
app.use("/api/v1/lottery2dthai12", lottery2dRoutes);

// User Role
app.use("/api/v1/userRole", userRoleRouter);

// User Register
app.use("/api/v1/user", userRouter);

// Main Unit
app.use("/api/v1/mainunit", mainUnitRouter);

// Main History
app.use("/api/v1/mainunithistories", mainUnitHistories);

module.exports = app;
