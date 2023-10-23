const Thai2DMorning12 = require("../../2DAll/models/thai2DLotteryMorning12Models");
const LotterySetting = require("../../lotterySetting/models/lotterySettingModels");

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Container 2D Moring 12 AM
exports.container2DMorning12 = async (req, res) => {
  try {
    const lotterySettingObj = await LotterySetting.findById(
      "652a8f081be78e73fa82ecc0"
    );
    const status = lotterySettingObj.status;
    const currentDateTime = new Date();
    const dayIndex = currentDateTime.getDay();
    const currentDay = daysOfWeek[dayIndex];
    const startDate = new Date(lotterySettingObj.startDate);
    const endDate = new Date(lotterySettingObj.endDate);

    if (status) {
      // if (currentDay === "Sunday" || currentDay === "Saturday") {
      //   res.status(200).json({
      //     status: "Success",
      //     message: "Saturday and Sunday are off day",
      //   });
      // }

      if (currentDateTime > startDate && currentDateTime < endDate) {
        // if (true) {
        const all2DNumber = await Thai2DMorning12.find();
        res.status(200).json({
          status: "Success",
          length: all2DNumber.length,
          data: {
            all2DNumber,
          },
        });
      } else {
        res.status(200).json({
          status: "Success",
          message: "Over The Time",
        });
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "Unavailable Now and Come Back Later",
      });
    }

    // const newGameCat = await GameCategory.create(req.body);
    // res.status(201).json({
    //   status: "success",
    //   data: {
    //     newGameCat,
    //   },
    // });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// Read All Game Category
exports.getGameCatAll = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const query = GameCategory.find();
  const allGameCategory = await query;

  res.status(200).json({
    status: "Success",
    data: {
      allGameCategory,
    },
  });
};

// Read All Game Category For Report
exports.getGameCatAllForReport = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const query = await GameCategory.find({ status: true });

  res.status(200).json({
    status: "Success",
    data: {
      gameCategory: query,
    },
  });
};

// Update Game Category
exports.updateGameCatStatus = async (req, res) => {
  try {
    const updateGameCat = await GameCategory.findByIdAndUpdate(
      req.body.id,
      { status: req.body.status },
      {
        new: true,
        runValidator: true,
      }
    );
    res.status(200).json({
      status: "Success",
      data: {
        updateGameCat,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
