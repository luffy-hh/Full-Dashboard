const { promisify } = require("util");
const crypto = require("crypto");
const sendEmail = require("../utils/email");

const jwt = require("jsonwebtoken");
const User = require("./userModels");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Yangon");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const GameCategory = require("../gameCategories/models/gameCategoryModels");
const GameSubCat = require("../gameCategories/models/gameSubCatModels");

const MasterCatStatus = require("../category_status/models/master_cat_status_models");
const MasterSubCatStatus = require("../category_status/models/master_subCat_status_models");
const LotteryFilterSetting = require("../lotteryFilterSetting/models/lotteryFilterSettingModels");
const AgentComession = require("../category_status/models/agent_comession_models");

const callbackService = require("../slots/slotegrator/callbackService");
const Withdrawl = require("../withdrawl/models/withdrawlModels");
const Deposit = require("../deposit/modals/depositModels");

const signToken = (user) => {
  let data = {
    id: user._id,
    name: user.name,
    userId: user.userId,
    email: user.email,
    role: user.role,
    uplineId: user.uplineId,
    downlineId: user.downlineId,
  };
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const generateRandomUserId = () => {
  const min = 100000;
  const max = 999999;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user);

  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOption.secure = true;
  res.cookie("jwt", token, cookieOption);

  user.password = undefined;
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
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

    const newUser = await User.create({ ...reqBody });

    if (newUser.role === "Master") {
      const gameCategories = await GameCategory.find();
      const GameSubCategories = await GameSubCat.find();
      const masterUserId = newUser._id.toString();
      const categoriesObjArr = [];
      const subCatObjArr = [];

      for (const category of gameCategories) {
        const categoryObj = {
          cat_id: category._id.toString(),
          status: category.status,
          cat_name: category.cat_name,
        };
        categoriesObjArr.push(categoryObj);
      }

      // Save the user to update categoriesObjArr
      await MasterCatStatus.create({
        master_id: masterUserId,
        categoryStatus: categoriesObjArr,
      });

      for (const subCat of GameSubCategories) {
        const obj = await LotteryFilterSetting.findOne({
          subCategoryId: subCat._id,
        });
        console.log("lotterysetting:", obj, obj?.mainCompensation);
        if (obj) {
          const newObj = {
            ...subCat.toObject(),
            mainCompensation: obj.mainCompensation,
            otherCompensation: obj.otherCompensation,
          };
          // console.log(newObj);
          subCatObjArr.push(newObj);
        }
      }

      // Save the user to update SubcategoriesObjArr
      await MasterSubCatStatus.create({
        master_id: masterUserId,
        subCatStatus: subCatObjArr,
      });
    }

    if (newUser.role === "Agent") {
      const GameSubCategories = await GameSubCat.find();
      const uplineID = newUser.uplineId;
      const agentId = newUser._id.toString();
      const subCatObjArr = [];

      for (const subCat of GameSubCategories) {
        const obj = await LotteryFilterSetting.findOne({
          subCategoryId: subCat._id,
        });
        if (obj) {
          const newObj = {
            ...subCat.toObject(),
          };
          subCatObjArr.push(newObj);
        }
      }
      console.log(subCatObjArr);

      await AgentComession.create({
        uplineId: uplineID,
        agent_id: agentId,
        subCatStatus: subCatObjArr,
      });
    }

    // Generate a JWT token
    const token = signToken(newUser);

    const sessionIdentifier = crypto.randomBytes(16).toString("hex");

    // Exclude the password field from the response
    const sessionAddedUser = await User.findByIdAndUpdate(
      newUser._id,
      {
        $set: { sessionIdentifier: sessionIdentifier },
      },
      { new: true }
    ).select("-password");

    createSendToken(sessionAddedUser, 201, res, sessionIdentifier);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: sessionAddedUser,
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
  console.log(req.body);
  try {
    const { userId, password } = req.body;
    const currentMyanmarTime = moment().format("YYYY-MM-DD HH:mm:ss");

    // ၁. request body ထဲမှာ UserId / Password နဲ့ User ရှိ/မရှိ စစ်
    if (!userId || !password) {
      return next(new AppError("Please Provide userId and Password", 400));
    }
    const user = await User.findOne({ userId });
    console.log(user);

    if (!user.status) {
      return next(new AppError("You have been blocked", 400));
    }
    // ၂. ရှိတယ်ဆိုရင် Password ကိုတိုက်စစ်ပြီး User က လက်ရှိ သုံးနေ / မသုံးနေကို စစ်

    // console.log(user);
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect userId or Password", 400));
    }
    const sessionIdentifier = crypto.randomBytes(16).toString("hex");
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          loginTime: moment(currentMyanmarTime).tz("Asia/Yangon").format(),
          sessionIdentifier: sessionIdentifier,
        },
      }
    );
    // ၃. အပေါ်နှစ်ခုမှန်ရင် JWT ကို Client ဘက်ကိုပို့

    const token = signToken(updatedUser);
    const formattedLoginTime = moment(updatedUser.loginTime)
      .tz("Asia/Yangon")
      .format();
    res.status(200).json({
      status: "Success",
      token,
      user: {
        ...updatedUser.toObject(),
        loginTime: formattedLoginTime,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.stack,
    });
  }
});

exports.test = async (req, res) => {
  let user = await callbackService.getUserBalance(367321);
  return res.send(user);
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1. Request လုပ်တဲ့ Client မှာ Token ရှိ/မရှိ စစ်ပါတယ်။
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in. Please log in!", 401));
  }

  // 2. ရှိတယ်ဆိုတဲ့ Token ကရော တစ်ကယ် မှန်/မမှန် စစ်ပါတယ်။
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // 3. Token မှန်တယ်ဆိုရင်တောင် Token ပိုင်ရှင် User က ရှိနေသေးတာ ဟုတ်/မဟုတ် ကိုစစ်ပါတယ်။
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError("Invalid session. Please log in again.", 401));
  }

  // 4. Token ယူပြီးမှ User က Password ချိန်းလိုက်တဲ့အခြေအနေကိုလဲ စစ်ထားဖို့လိုပါတယ်။
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "User recently changed the password. Please log in again",
        401
      )
    );
  }

  req.user = currentUser;
  next();
});

exports.logout = catchAsync(async (req, res, next) => {
  try {
    // Get the user ID from the decoded token
    const userId = req.user._id;

    // Find the user by ID and clear the session identifier
    const user = await User.findByIdAndUpdate(userId, {
      sessionIdentifier: undefined,
    });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Clear the session identifier cookie
    res.clearCookie("sessionIdentifier");

    res.status(200).json({
      status: "Success",
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
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

// Read All User With Role
exports.getUsersAll = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const role = req.params.role;
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query;

    query = User.find(JSON.parse(queryStr)).select(
      "-password -loginTime -__v -sessionIdentifier"
    );

    //const query = User.find({ role });
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

// Read All User
exports.getFilterUser = async (req, res) => {
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

// Profile
exports.getProfile = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    res.status(200).json({
      status: "Success",
      data: {
        currentUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// Profile
exports.updateProfile = async (req, res) => {
  try {
    const updateObj = req.body;

    const updateUser = await User.findByIdAndUpdate(req.params.id, updateObj, {
      new: true,
    });
    console.log(updateUser);
    res.status(200).json({
      status: "Success",
      data: {
        updateUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  // 1. Get user's email
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const userEmail = user.email;

  if (!userEmail) {
    return next(new AppError("There is no user with email address", 404));
  }

  // 2. Generate a reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3. Construct the reset URL
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/resetPassword/${resetToken}`;

  console.log("Reset URL:", resetURL); // Log the reset URL

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}. If you didn't forget your password, please ignore this email.`;

  // 4. Send the email
  try {
    await sendEmail({
      email: userEmail,
      subject: "Your password reset token (valid for 10 minutes)",
      message,
    });

    res.status(200).json({
      status: "Success",
      message: "Token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try Again Later", 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});

// update password from upline
exports.updatePasswordFromUpline = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  try {
    const updateObj = req.body;
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(400).json({
        status: "failed",
        message: "The user is not existed or not valid",
      });
    }
    for (let field in updateObj) {
      user[field] = updateObj[field];
    }
    const updateUser = await user.save();
    res.status(200).json({
      status: "succeed",
      updateUser,
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
});

// // get all deposit and withdrawal for a user
// exports.getDepAndWithHistoryForEachUser = catchAsync(async (req,res,next)=>{
//   try {
//       const withdrawalForSpecificUser = await Withdrawl.find({fromId: req.params.id})
//       const depositForSpecificUser = await Deposit.find({fromId: req.params.id})
//       const allLogs = [...withdrawalForSpecificUser,...depositForSpecificUser]
//      res.status(200).json({
//        status:'succeed',
//        allLogs
//      })
//   }catch (e) {
//     new AppError("Something Went Wrong", 500)
//   }
// })

// Read All User By Role
exports.getAllUserByRole = async (req, res) => {
  try {
    const masterQuery = User.find({ role: "Master" });
    const masterAll = await masterQuery;

    const agentQuery = User.find({ role: "Agent" });
    const agentAll = await agentQuery;

    const userQuery = User.find({ role: "User" });
    const userAll = await userQuery;

    const resObj = {
      masterCount: masterAll.length,
      agentCount: agentAll.length,
      userCount: userAll.length,
    };

    res.status(200).json({
      status: "success",
      data: {
        resObj,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// Downline User
exports.downlineUser = async (req, res) => {
  try {
    const userObj = await User.findById(req.params.id);
    const userId = userObj.userId;

    const downlineObj = await User.find({ uplineId: userId });
    res.status(200).json({
      status: "success",
      length: downlineObj.length,
      data: {
        downlineObj,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
