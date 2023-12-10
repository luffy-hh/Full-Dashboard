const Thai3DNum = require("../models/thai3DNumModels");

exports.read3dAllNum = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = Thai3DNum.find(JSON.parse(queryStr));
    const lottery3dNumAll = await query;

    res.status(200).json({
      status: "success",
      length: lottery3dNumAll.length,
      data: {
        lottery2dNumAll: lottery3dNumAll,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.updateSingle3DNum = async (req, res) => {
  try {
    const id = req.body.id;
    const reqBody = req.body;
    console.log(id, reqBody);

    const updateSingle3DNumField = await Thai3DNum.findByIdAndUpdate(
      id,
      reqBody
    );
    res.status(200).json({
      status: "success",
      data: {
        updateSingle3DNumField,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
