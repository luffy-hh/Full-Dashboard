const UserRole = require("./userRolesModel");

// Read All Users Role
exports.getUsersRoleAll = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = UserRole.find(JSON.parse(queryStr));
    const allUserRole = await query;

    res.status(200).json({
      status: "Success",
      length: allUserRole.length,
      data: {
        userRoles: allUserRole,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// Create User Roles
exports.createUserRole = async (req, res) => {
  try {
    const newUserRole = await UserRole.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newUserRole,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
