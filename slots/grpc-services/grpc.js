const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const callbackService = require('../slotegrator/callbackService');
const packageDefinition = protoLoader.loadSync(path.join(__dirname+"server.js",'../../protos/users.proto'));
const userProto = grpc.loadPackageDefinition(packageDefinition);

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Success in grpc"));

async function findUser(call, callback) {
    let userId = call.request.id;
    let user_data = await callbackService.getUserBalance(userId)
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