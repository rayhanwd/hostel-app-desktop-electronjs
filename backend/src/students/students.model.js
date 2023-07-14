const mongoose = require('mongoose');
const { Schema } = mongoose;
//Student(id, fullName, roll, age, class, hall, status)
const studentSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: false
    },
    roll: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    class: {
        type: String,
        required: false
    },
    hall: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
},
    {
        timestamps: true,
        versionKey: false,
    });

module.exports = mongoose.model('Student', studentSchema)