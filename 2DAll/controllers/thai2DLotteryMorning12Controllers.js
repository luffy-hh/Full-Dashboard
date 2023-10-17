const fs = require("fs");
const Thai2DLotteryMorning12 = require("../models/thai2DLotteryMorning12Models");

const number2DAll = JSON.parse(
  fs.readFileSync(`${__dirname}/../../dev-data/2d.json`, "utf-8")
);

exports.create2D = async (req, res) => {
  try {
    for (const singleNum of number2DAll) {
      const single2DNum = await Thai2DLotteryMorning12.create(singleNum);
    }
    res.status(201).json({
      status: "Complete Insert Data",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.read2dAllNum = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = Thai2DLotteryMorning12.find(JSON.parse(queryStr));
    const lottery2dNumAll = await query;

    res.status(200).json({
      status: "success",
      length: lottery2dNumAll.length,
      data: {
        lottery2dNumAll,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.update2DNum = async (req, res) => {
  try {
    const reqBody = req.body;

    const updateSingle2DNumField =
      await Thai2DLotteryMorning12.findByIdAndUpdate(id, reqBody);
    res.status(200).json({
      status: "success",
      data: {
        updateSingle2DNumField,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
