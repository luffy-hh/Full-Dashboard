const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const socketIo = require("socket.io");
const gameSocket = require("./socket/index");

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


const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const callbackService = require('./slots/slotegrator/callbackService');
const User = require("./users/userModels");
const packageDefinition = protoLoader.loadSync('./protos/users.proto');
const userProto = grpc.loadPackageDefinition(packageDefinition);

async function findUser(call, callback) {
  let userId = call.request.userId;
  // let user_data = await callbackService.getUserBalance(userId)
  const user = await User.findOne({ userId: userId });
  let user_data = {
    // id: user.id,
    userId:user.userId,
    role:user.role,
    unit:user.unit,
    gameUnit:user.gameUnit,
    promotionUnit:user.promotionUnit,
}
  if(user_data) {
      callback(null, user_data);
  }
  else {
      callback({
          message: 'User not found',
          code: grpc.status.INVALID_ARGUMENT
      });
  }
}

const server = new grpc.Server();
server.addService(userProto.Users.service, { find: findUser });
server.bindAsync('0.0.0.0:50071', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});
