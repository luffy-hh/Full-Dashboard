const ShanTable = require("./shanTableModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

// Create Shan Table
exports.createShanTable = catchAsync(async (req, res) => {
  try {
    const { tableName, role, description } = req.body;

    const insertObj = {
      tableName,
      role,
      description,
    };

    const newTable = await ShanTable.create({ ...insertObj });
    newTable.endPoint = `/${newTable._id.toString()}`;
    await newTable.save();
    res.status(201).json({
      status: "success",
      data: {
        newTable,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
});

exports.readShanRole = catchAsync(async (req, res) => {
  try {
    const allShanRole = await ShanRole.find({});

    res.status(201).json({
      status: "success",
      length: allShanRole.length,
      data: {
        allShanRole,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

// Update Shan Roll
exports.updateShanTable = catchAsync(async (req, res) => {
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
