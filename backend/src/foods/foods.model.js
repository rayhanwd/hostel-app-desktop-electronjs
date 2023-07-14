const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodSchema = new Schema({
    id:{
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
        versionKey: false,
    })

module.exports = mongoose.model('Food', foodSchema);