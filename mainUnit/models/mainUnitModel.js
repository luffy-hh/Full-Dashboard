const mongoose = require("mongoose");
const mainUnitSchema = new mongoose.Schema({
  mainUnit: {
    type: String,
    required: [true, "Product name must be add"],
    unique: true,
  },
});
const MainUnit = mongoose.model("MainUnit", mainUnitSchema);
module.exports = MainUnit;
