const multer = require("multer");
const BankName = require("../models/bankNameModels");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/bank_name");
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
exports.uploadBankNameImg = upload.single("img");

// Create Bank Name
exports.createBankName = catchAsync(async (req, res) => {
  try {
    if (req.file) {
      const reqBody = req.body;
      reqBody.img = req.file.filename;
      const imageLink = `${req.protocol}://${req.get(
        "host"
      )}/images/bank_name/${req.file.filename}`;
      const newBankName = await BankName.create({ ...req.body });
      const newBankNameData = await BankName.findById(newBankName._id).populate(
        "bankType"
      );
      res.status(201).json({
        status: "success",
        data: {
          newBankNameData,
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

// Read All Bank Name
exports.getBankNameAll = catchAsync(async (req, res) => {
  try {
    const query = BankName.find().populate("bankType");
    const allBankName = await query;

    // Construct image links for each result
    const bankNameWithImageLinks = allBankName.map((bankName) => {
      return {
        ...bankName._doc,
        imgLink: `${req.protocol}://${req.get("host")}/images/bank_name/${
          bankName.img
        }`,
      };
    });

    res.status(200).json({
      status: "Success",
      length: allBankName.length,
      data: {
        allBankName: bankNameWithImageLinks, // Include image links in the response
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

// Update Bank Name
exports.updateBankName = catchAsync(async (req, res) => {
  try {
    const bankNameId = req.params.id; // Assuming you have the bank name's ID in the route parameter
    const updateObj = {};

    if (req.body.bankType) {
      updateObj.bankType = req.body.bankType;
    }

    if (req.body.bankName) {
      updateObj.bankName = req.body.bankName;
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

    const updatedBankName = await BankName.findByIdAndUpdate(
      bankNameId,
      updateObj,
      {
        new: true,
      }
    ).populate("bankType");

    res.status(200).json({
      status: "Success",
      data: {
        updatedBankName,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});
