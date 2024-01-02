const mongoose = require("mongoose");
const Thai3DLuckySchema = mongoose.Schema({
    subCatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GameSubCat",
        required: [true, "Sub Category id must be added."],
    },
    number: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: [true, "Date must be add for Lucky Out"],
    },
    otherCompensationNumberArray:[
        {
            otherNumber:{
                type : String,
            }
        }
    ]
});

const Thai3DLucky = mongoose.model('Thai3DLucky',Thai3DLuckySchema)
module.exports = Thai3DLucky;