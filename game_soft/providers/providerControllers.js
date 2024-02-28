const Provider = require("./providersModels");
const catchAsync = require("../../utils/catchAsync");

exports.createProvider = catchAsync(async (req, res) => {
  try {
    const { providerCode, providerName, gameTypeCode, gameType } = req.body;
    const reqBody = {
      providerCode,
      providerName,
      gameTypeCode,
      gameType,
    };

    const newProvider = await Provider.create(reqBody);

    res.status(201).json({
      status: "success",
      data: {
        newProvider,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

exports.readProvuders = catchAsync(async (req, res) => {
  try {
    const providersObj = await Provider.find({});

    res.status(201).json({
      status: "success",
      count: providersObj.length,
      data: {
        providersObj,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});
