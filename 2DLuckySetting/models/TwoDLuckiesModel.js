const mongoose = require("mongoose");
const TwoDLuckySchema = mongoose.Schema({
  subCatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GameSubCat",
    required: [true, "Sub Category id must be added."],
  },
  number: {
    type: String,
    required: true,
    match: [/^\d{2}$/, 'number must have length of 2']
  },
  date: {
    type: Date,
    required: [true, "Date must be add for Lucky Out"],
  },
});

const TwoDLucky = mongoose.model('TwoDLucky',TwoDLuckySchema)
module.exports = TwoDLucky;