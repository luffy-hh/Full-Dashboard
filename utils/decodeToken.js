const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../users/userModels");
exports.decodeToken = async (token) => {
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    return currentUser;
  } catch (error) {
    console.error(error);
  }
};
