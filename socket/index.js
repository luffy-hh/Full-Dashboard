const User = require('../users/userModels')
const ShanPlayRing = require("../shan/shan_ring/models");
const {FETCH_RING_INFO} = require("../shanGame/actions");


const rings = await ShanPlayRing.find({})
const players = rings.map(ring=> ring.players)
const init = (socket,io)=>{
    socket.on(FETCH_RING_INFO,async (token)=>{
        let user;

    })
}