const mongoose = require('mongoose');

const appThingsSchema = new mongoose.Schema({
    settingName:{
        type: String,
        required: [true, "Setting Name must be added!"],
        unique:true
    },
    settingText:{
        type: String,
    },
    settingOpen:{
        type: Boolean,
        default: true
    },
})
const AppThings = mongoose.model('AppThings', appThingsSchema)
module.exports = AppThings