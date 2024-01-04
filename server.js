const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const socketIo = require("socket.io");
const gameSocket = require("./socket/index");

require("./slots/grpc-services/grpc")

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Success"));

const port = process.env.PORT || 3000;
const http_server = app.listen(port, () => console.log("Listen Now", port));
const io = socketIo(http_server);
io.on("connection", (socket) => gameSocket.init(socket, io));

