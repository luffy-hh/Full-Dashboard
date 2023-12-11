const catchAsync = require("../../utils/catchAsync");
const ShanPlayRing = require("../shan_ring/models");
const ShanCard = require("../shan_card/model");
const ShanPlay = require("./model");
const {all} = require("express/lib/application");
const Shan = require("../../client/src/Feactures/shan");

exports.startPlaying = catchAsync(async (req,res,next)=>{
    try {
        const allShanCards = await ShanCard.find({})
        const currentRing = await ShanPlayRing.findById(req.body.id)
        const allPlayersInCurrentRing = currentRing.players
        const playerLengthInCurrentRing = allPlayersInCurrentRing.length
        const totalNeededCardArray = []
        if(playerLengthInCurrentRing > 1){
            // update all player playingStatus in currentRing
            const updatedRingPlayers = await ShanPlayRing.findByIdAndUpdate(currentRing._id,{
            $set:{status:"active","players.$[].playingStatus":"playing"}
            },{new:true})
            const shanArrayValue = () => {
                let shanVal =allShanCards[Math.round(Math.random() * 51)];
                if (totalNeededCardArray.some((card) => card._id === shanVal._id)) {
                    shanVal = allShanCards[Math.round(Math.random() * 51)];
                } else {
                    totalNeededCardArray.push(shanVal);
                }
            };
            let i = 0;
            while (i < 1) {
                shanArrayValue();
                if (totalNeededCardArray.length === playerLengthInCurrentRing * 3) {
                    i++;
                }
            }
            // ORIGINAL CODE SNIPPET
            // for(let [index,acc] of allPlayersInCurrentRing.entries()){
            //     await ShanPlay.create({ringId: currentRing._id, holderId: acc.userId, cards:[{cardId: totalNeededCardArray[index]._id}]})
            // }
            // totalNeededCardArray.splice(0,playerLengthInCurrentRing);
            // for(let [index,acc] of allPlayersInCurrentRing.entries()){
            //     await ShanPlay.findOneAndUpdate({holderId:acc.userId},{
            //         $push:{cards:{cardId:totalNeededCardArray[index]._id}}
            //     })
            // }
            // totalNeededCardArray.splice(0,playerLengthInCurrentRing);

            // AFTER REFACTORING THE CODE SNIPPET
            for (let [index, acc] of allPlayersInCurrentRing.entries()) {
                const card = { cardId: totalNeededCardArray[index]._id };
                await ShanPlay.create({
                    ringId: currentRing._id,
                    holderId: acc.userId,
                    cards: [card]
                });
                totalNeededCardArray.splice(0, 1);
                await ShanPlay.updateOne(
                    { holderId: acc.userId },
                    { $push: { cards: card } }
                );
            }
            let cardTotalAndUserIdArr = [];
            const currentRingPlayingCardsArr = await ShanPlay.find({ringId:currentRing._id}).select("holderId cards");
            for(let currentCard of currentRingPlayingCardsArr){
                const currentUserCards = []
                for(let card of currentCard.cards){
                    const eachCard = allShanCards.find(shanCard=> card.cardId === shanCard.id)
                    currentCard.push(eachCard)
                }
                const total = currentUserCards.reduce((prev,cur)=> prev.cardValue + cur.cardValue,0)
                const obj = {userId: currentCard.holderId,cards:currentUserCards,total: Number(total.toString().slice(-1))}
                cardTotalAndUserIdArr.push(obj)
            }
            const onlyPlayingPlayers = await ShanPlayRing.find({_id:currentRing._id,players:{$elemMatch:{playingStatus:"playing"}}}).select("players");
            const bankerObj = onlyPlayingPlayers.find(player=> player.player_roll === "banker")
            const bankerTotal = cardTotalAndUserIdArr.find(card => card.userId === bankerObj.userId);
            for(let each of cardTotalAndUserIdArr){
                if(each.userId !== bankerObj.userId){
                    if(each.total < bankerTotal.total){
                        await ShanPlayRing.updateOne({_id:currentRing._id,"players.userId":each.userId},{
                            $set:{"players.$.finalResult":"lose"}
                        })
                    }else{
                        await ShanPlayRing.updateOne({_id:currentRing._id,"players.userId":each.userId},{
                            $set:{"players.$.finalResult":"win"}
                        })
                    }
                }
            }
            await ShanPlayRing.findByIdAndUpdate(currentRing._id,{
                $set:{status:"inactive", "players.$[].playingStaus":"waiting"},
                $inc:{game_round:1}
            },{new:true})
            const currentRingWinlose = await ShanPlayRing.findById(currentRing._id).select('players')
            const obj =
            res.status(200).json({
                status:'succeed',
                message:'A round has finished successfully',
                winLose:currentRingWinlose,
                cards:cardTotalAndUserIdArr
            })
        }

    }catch (e) {
        res.status(500).json({
            status:"failed",
            message: process.env.NNODE_ENV === "development" ? e.stack : "Something went wrong while starting to play Shan."
        })
    }

})