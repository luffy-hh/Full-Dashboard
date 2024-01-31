const catchAsync = require("../../utils/catchAsync");
const ShanPlayRing = require("../shan_ring/models");
const ShanCard = require("../shan_card/model");
const ShanPlay = require("./model");

exports.startPlaying = catchAsync() => {
  try {

  } catch (e) {
    res.status(500).json({
      status: "failed",
      message:
        process.env.NODE_ENV === "development"
          ? e.stack
          : "Something went wrong while starting to play Shan.",
    });
  }
});
