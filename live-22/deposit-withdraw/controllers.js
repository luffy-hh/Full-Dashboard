const Player = require("./models");

async function depositFunds(playerId, amount) {
  try {
    let player = await Player.findOne({ playerId });

    if (!player) {
      player = new Player({ playerId, balance: amount });
    } else {
      player.balance += amount;
    }

    await player.save();
    return { success: true, message: "Funds deposited successfully" };
  } catch (error) {
    return { success: false, message: "Error depositing funds", error };
  }
}

async function withdrawFunds(playerId, amount) {
  try {
    const player = await Player.findOne({ playerId });

    if (!player || player.balance < amount) {
      return { success: false, message: "Insufficient funds" };
    }

    player.balance -= amount;
    await player.save();
    return { success: true, message: "Funds withdrawn successfully" };
  } catch (error) {
    return { success: false, message: "Error withdrawing funds", error };
  }
}

module.exports = {
  depositFunds,
  withdrawFunds,
};
