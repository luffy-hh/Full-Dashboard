const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./userModels");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const generateRandomUserId = () => {
  const min = 100000;
  const max = 999999;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
};

exports.signup = catchAsync(async (req, res, next) => {
  try {
    const reqBody = req.body;
    let userId;
    let isUnique = false;
    while (!isUnique) {
      userId = generateRandomUserId();
      const existingUser = await User.findOne({ userId });
      if (!existingUser) {
        isUnique = true;
      }
    }
    reqBody.userId = userId;

    const newUser = await User.create(reqBody);
    const token = signToken(newUser._id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  try {
    const { userId, password } = req.body;
    const reqTime = new Date();

    // ၁. request body ထဲမှာ UserId / Password နဲ့ User ရှိ/မရှိ စစ်
    if (!userId || !password) {
      return next(new AppError("Please Provide userId and Password", 400));
    }

    // ၂. ရှိတယ်ဆိုရင် Password ကိုတိုက်စစ်ပြီး User က လက်ရှိ သုံးနေ / မသုံးနေကို စစ်

    const user = await User.findOneAndUpdate(
      { userId },
      { loginTime: reqTime }
    ).select("-__v +password -email");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect userId or Password", 400));
    }

    // ၃. အပေါ်နှစ်ခုမှန်ရင် JWT ကို Client ဘက်ကိုပို့
    const token = signToken(user._id);
    res.status(200).json({
      stauts: "Success",
      token,
      user,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

exports.protect = catchAsync(async (req, res, next) => {
  //1. Request လုပ်တဲ့ Client မှာ Token ရှိ/မရှိ စစ်ပါတယ်။
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);

  if (!token) {
    return next(new AppError("You are not login , Please Login!", 401));
  }

  //2. ရှိတယ်ဆိုတဲ့ Token ကရော တစ်ကယ် မှန်/မမှန် စစ်ပါတယ်။
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  //3. Token မှန်တယ်ဆိုရင်တောင် Token ပိုင်ရှင် User က ရှိနေသေးတာ ဟုတ်/မဟုတ် ကိုစစ်ပါတယ်။
  const curentUser = await User.findById(decoded.id);
  if (!curentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  //4. Token ယူပြီးမှ User က Password ချိန်းလိုက်တဲ့အခြေအနေကိုလဲ စစ်ထားဖို့လိုပါတယ်။
  if (curentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User Recently Change Password ! Please Login Again", 401)
    );
  }
  req.user = curentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

// Read All User
exports.getUsersAll = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const query = User.find(JSON.parse(queryStr));
    const userAll = await query;

    res.status(200).json({
      status: "success",
      length: userAll.length,
      data: {
        userAll,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
