const Food = require('../foods/foods.model');
const Student = require('../students/students.model');
const Distribution = require('../distribution/distribution.model');



const getCounts = async (req, res) => {
  try {
    const foods = await Food.countDocuments();
    const students = await Student.countDocuments();
    const distributions = await Distribution.countDocuments();


    res.json({ foods, students ,distributions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get counts.' });
  }
};

module.exports = {
  getCounts,
};
