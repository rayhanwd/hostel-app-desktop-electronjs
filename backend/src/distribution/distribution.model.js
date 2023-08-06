const mongoose = require('mongoose');
const { Schema } = mongoose;

const distributionSchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: false
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  meal: {
    type: String,
    required: true,
  },
  recepe: {
    type: String,
    required: true,
  },
  isServed: {
    type: Boolean,
    default: false
  }
});

distributionSchema.set('timestamps', true);
distributionSchema.set('versionKey', false);

module.exports = mongoose.model('Distribution', distributionSchema);
