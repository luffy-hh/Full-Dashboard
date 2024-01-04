const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const service = require('./service')

const packageDefinition = protoLoader.loadSync(path.join(__dirname+"server.js",'../../protos/users.proto'));
const userProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
server.addService(userProto.Users.service, { find: service.findUser });
server.bindAsync('0.0.0.0:50071', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});