const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

// Change Unit

exports.changeUnit = catchAsync(async (req, res) => {
  try {
    const { fromUnitName, toUnitName, unit_amount } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const userObj = await User.findById(userId);
    console.log(fromUnitName, toUnitName);

    // Use square bracket notation to access dynamic property names
    const fromUnitVal = userObj[fromUnitName];
    console.log("fromUnitVal:", fromUnitVal);
    console.log("unit_amount:", unit_amount);

    if (fromUnitVal < unit_amount) {
      console.log("Condition is true");
      res.status(404).json({
        status: "fail",
        message: "Not Enough Amount To Change",
      });
    } else {
      const toUnitVal = userObj[toUnitName];
      const newFromUnit = fromUnitVal - unit_amount;
      const newToUnit = toUnitVal + unit_amount;

      const userUpdate = await User.findByIdAndUpdate(
        userId,
        { [fromUnitName]: newFromUnit, [toUnitName]: newToUnit },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json({
        status: "success",
        data: {
          userUpdate,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});
