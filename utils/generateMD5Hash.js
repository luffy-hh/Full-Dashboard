const crypto = require("crypto");
exports.generateMD5Hash = (input) => {
  return crypto.createHash("md5").update(input).digest("hex");
};
