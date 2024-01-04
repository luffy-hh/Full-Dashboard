const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const service = require('./service')

const userPackageDefinition = protoLoader.loadSync(path.join(__dirname+"server.js",'../../protos/users.proto'));
const userProto = grpc.loadPackageDefinition(userPackageDefinition);

const slotegratorPackageDefinition = protoLoader.loadSync(path.join(__dirname, '../../protos/slotegrator.proto'));
const slotegratorProto = grpc.loadPackageDefinition(slotegratorPackageDefinition);

const server = new grpc.Server();
server.addService(userProto.Users.service, { find: service.findUser });
server.addService(slotegratorProto.Slotegrator.service, { 
    bet: service.betSlotegrator,
    win: service.winSlotegrator,
    refund: service.refundSlotegrator,
});
server.bindAsync('0.0.0.0:50071', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});