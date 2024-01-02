const axios = require("axios");
const crypto = require("crypto");
const User = require("../../users/userModels");
const InfinityPlayer = require("../create_player/createPlayerModles");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

// Check Infinity Player Controller
exports.checkPlayerController = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUserId = decoded.id;
  const userObj = await User.findById(currentUserId);

  const playerId = userObj.userId;

  try {
    const currentPlayer = await InfinityPlayer.find({
      playerId: playerId,
    });

    if (currentPlayer) {
      res.json({
        success: true,
      });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
