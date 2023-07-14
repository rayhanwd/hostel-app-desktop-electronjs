//Distribution(id, studentId, date, shift,status, foodItemList)
const mongoose = require('mongoose');
const { Schema } = mongoose;

const distributionSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    date: {
        type: Date.now(),
        required: true
    },
    shift: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    foodItemList: {
        type: Array,
        required: true
    },
},
    {
        timestamps: true,
        versionKey: false,
    })

module.exports = mongoose.model('distribution', distributionSchema);