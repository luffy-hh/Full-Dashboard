const multer = require("multer");
const ShanRole = require("./shanRoleModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/shan_roll");
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
exports.uploadShanRoleImg = upload.single("img");

// Create Shan Roll
exports.createShanRole = catchAsync(async (req, res) => {
  try {
    if (req.file) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      const currentUserId = decoded.id;
      const reqBody = { ...req.body };
      reqBody.img = req.file.filename;
      const imageLink = `${req.protocol}://${req.get(
        "host"
      )}/images/shan_roll/${req.file.filename}`;
      const newShanRole = await ShanRole.create({ ...reqBody });
      res.status(201).json({
        status: "success",
        data: {
          newShanRole,
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

// Read All Shan Roll
exports.getShanRoleAll = catchAsync(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Select the 'img' field in the query
    const query = ShanRole.find(JSON.parse(queryStr));
    const allShanRole = await query;

    // Construct image links for each result
    const shanRoleWithImageLinks = allShanRole.map((shanRole) => {
      return {
        ...shanRole._doc,
        imgLink: `${req.protocol}://${req.get("host")}/images/shan_roll/${
          shanRole.img
        }`,
      };
    });

    res.status(200).json({
      status: "Success",
      length: allShanRole.length,
      data: {
        allShanRole: shanRoleWithImageLinks, // Include image links in the response
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

// Update Shan Roll
exports.updateShanRole = catchAsync(async (req, res) => {
  try {
    // Extract user ID from token
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUserId = decoded.id;

    // Find the ShanRole document by ID
    const shanRoleId = req.params.id;
    const shanRole = await ShanRole.findById(shanRoleId);

    // Check if the ShanRole document exists
    if (!shanRole) {
      throw new AppError("ShanRole not found", 404);
    }

    // Update ShanRole properties
    const reqBody = { ...req.body, ownderData: currentUserId };

    // Check if an image file is provided in the update
    if (req.file) {
      reqBody.img = req.file.filename;
    }

    // Update the ShanRole document
    const updatedShanRole = await ShanRole.findByIdAndUpdate(
      shanRoleId,
      reqBody,
      {
        new: true,
        runValidators: true,
      }
    );

    // Build the image URL link if an image was provided in the update
    let imageLink;
    if (req.file) {
      imageLink = `${req.protocol}://${req.get("host")}/images/shan_roll/${
        req.file.filename
      }`;
    }

    res.status(200).json({
      status: "success",
      data: {
        updatedShanRole,
        imageLink,
      },
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: "fail",
      message: err.message || "Internal Server Error",
    });
  }
});
