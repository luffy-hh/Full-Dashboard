const multer = require("multer");
const BankAcc = require("../models/bankAccModels");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/bank_acc");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("No an Image!, Please Upload only Image", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadBankAccImg = upload.single("img");

// Create Bank Account
exports.createBankAcc = catchAsync(async (req, res) => {
  try {
    if (req.file) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      const currentUserId = decoded.id;
      const reqBody = { ...req.body, ownderData: currentUserId };
      reqBody.img = req.file.filename;
      const imageLink = `${req.protocol}://${req.get("host")}/images/bank_acc/${
        req.file.filename
      }`;
      const newBankAcc = await BankAcc.create({ ...reqBody });
      const newBankAccData = await BankAcc.findById(newBankAcc._id)
        .populate("bankNameData")
        .populate("ownderData");
      console.log(newBankAccData);
      res.status(201).json({
        status: "success",
        data: {
          newBankAccData,
          imageLink,
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

// Read All Bank Account
exports.getBankAccAll = catchAsync(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    // Select the 'img' field in the query
    const query = BankAcc.find(JSON.parse(queryStr))
      .populate("bankNameData")
      .populate("ownderData");

    const allBankAcc = await query;

    // Construct image links for each result
    const bankAccWithImageLinks = allBankAcc.map((bankAcc) => {
      return {
        ...bankAcc._doc,
        imgLink: `${req.protocol}://${req.get("host")}/images/bank_name/${
          bankAcc.img
        }`,
      };
    });

    res.status(200).json({
      status: "Success",
      length: allBankAcc.length,
      data: {
        allBankAcc: bankAccWithImageLinks, // Include image links in the response
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

// Read Bank Account Me
exports.getBankAccMe = catchAsync(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUserId = decoded.id;
    console.log(currentUserId);

    // Select the 'img' field in the query
    const query = BankAcc.find({ ownderData: currentUserId })
      .populate("bankNameData")
      .populate("ownderData");

    const allBankAcc = await query;
    console.log(allBankAcc);

    // Construct image links for each result
    const bankAccWithImageLinks = allBankAcc.map((bankAcc) => {
      return {
        ...bankAcc._doc,
        imgLink: `${req.protocol}://${req.get("host")}/images/bank_name/${
          bankAcc.img
        }`,
      };
    });

    res.status(200).json({
      status: "Success",
      length: allBankAcc.length,
      data: {
        allBankAcc: bankAccWithImageLinks, // Include image links in the response
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

// Read Bank Account Upline
exports.getBankAccUpline = catchAsync(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUserId = decoded.id;
    const currentUserObj = await User.findById(currentUserId);
    const currentUserUplineId = currentUserObj.uplineId;
    const uplineObj = await User.findOne({ userId: currentUserUplineId });
    const uplineUserObjId = uplineObj._id.toString();

    // Select the 'img' field in the query
    const query = BankAcc.find({ ownderData: uplineUserObjId })
      .populate("bankNameData")
      .populate("ownderData");

    const allBankAcc = await query;
    console.log(allBankAcc);

    // Construct image links for each result
    const bankAccWithImageLinks = allBankAcc.map((bankAcc) => {
      return {
        ...bankAcc._doc,
        imgLink: `${req.protocol}://${req.get("host")}/images/bank_name/${
          bankAcc.img
        }`,
      };
    });

    res.status(200).json({
      status: "Success",
      length: allBankAcc.length,
      data: {
        allBankAcc: bankAccWithImageLinks, // Include image links in the response
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

// Update Bank Account name
exports.updateBankAcc = catchAsync(async (req, res) => {
  try {
    const bankAccId = req.params.id; // Assuming you have the bank name's ID in the route parameter
    const updateObj = {};

    if (req.body.bankNameId) {
      updateObj.bankNameId = req.body.bankNameId;
    }

    if (req.body.name) {
      updateObj.name = req.body.name;
    }

    if (req.body.account) {
      updateObj.account = req.body.account;
    }

    if (req.body.status) {
      updateObj.status = req.body.status;
    }

    if (req.file) {
      updateObj.img = req.file.filename;
      updateObj.imgLink = `${req.protocol}://${req.get(
        "host"
      )}/images/bank_name/${req.file.filename}`;
    }

    const updatedBankAcc = await BankAcc.findByIdAndUpdate(
      bankAccId,
      updateObj,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "Success",
      data: {
        updatedBankAcc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});
