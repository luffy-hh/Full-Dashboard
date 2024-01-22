const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const app = require("./app");
require("./slots/grpc-services/grpc");
const setupSocketLogic = require("./shan/shan_table/shanSocket");
const tableGetter = require("./shan/shan_table/tableGetter");

dotenv.config({path: "./config.env"});
let options = {};

let io;
let tableRooms = [];

mongoose
    .connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connection Success");
    })
    .catch((error) => {
        console.error(error);
    });

const initFunction = async () => {
    tableRooms = [];
    const tablesValue = await tableGetter.getTables();
    tableRooms = [...tableRooms, ...tablesValue];
    setupServer();
};
initFunction();

function setupServer() {
    const port = process.env.PORT || 5000;
    const http_server = http.createServer(app);

    io = new Server(httpServer, {
        cors: {
            origin: "*", // replace with your domain
            credentials: true
        }
    });

    console.log("endpoint:" + tableRooms);

    // Default namespace connection event
    io.on("connection", (socket) => {
        console.log(`${socket.id} : user connected`);
        socket.emit("joinSocket", {message: "Welcome To Shan"});
    });

    // Custom namespace "/admin" connection event
    const adminNamespace = io.of("/admin");
    adminNamespace.on("connection", (socket) => {
        console.log(`Admin ${socket.id} connected`);

        // Handle "changeTable" event
        socket.on("changeTable", async () => {
            tableRooms = [];
            const tablesValue = await tableGetter.getTables();
            tableRooms = [...tableRooms, ...tablesValue];
            console.log("Change Table Value:", tablesValue);
        });

        // Handle "disconnect" event
        socket.on("disconnect", () => {
            console.log(`Admin ${socket.id} disconnected`);
        });
    });

    setupSocketLogic(io, tableRooms);

    http_server.listen(port, () => console.log("Listen Now", port));
}
