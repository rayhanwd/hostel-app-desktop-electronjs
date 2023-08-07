const Distribution = require('./distribution.model');
const Student = require('../students/students.model');


const createDistributionData = async (req, res) => {
  try {
    const { foodName, meals } = req.body;

    const now = new Date();
    const date = now.toISOString().slice(0, 10);

    let meal;
    if (meals === 'Breakfast') {
      meal = 0; // Breakfast meal
    } else if (meals === 'Lunch') {
      meal = 1; // Lunch meal
    } else if (meals === 'Dinner') {
      meal = 2; // Dinner meal
    } else {

      return res.status(400).json({ message: 'Invalid meal type provided.' });
    }

    const existingDistributionData = await Distribution.find({
      date: date,
      meal: meal,
    });

    if (existingDistributionData.length > 0) {
      return res.status(200).json({ message: 'Distribution data already exists for today.', data: existingDistributionData });
    }

    const students = await Student.find().select('_id').exec();


    const createdDistributionForms = [];

    for (const student of students) {
      const distributionForm = new Distribution({
        student: student._id,
        meal: meal,
        recepe: foodName,
        date: date,
        isServed: false
      });

      const createdForm = await distributionForm.save();
      createdDistributionForms.push(createdForm);
    }

    res.status(201).json({ message: 'Distribution forms created successfully.', data: createdDistributionForms });


  } catch (err) {

    console.error('Error creating distribution forms:', err);
    res.status(500).json({ message: 'Failed to create distribution forms.', data: null });
  }
};

const getDistributionData = async (req, res) => {
  try {
    const now = new Date();

    let meal;
    if (now.getHours() >= 8 && now.getHours() < 11) {
      meal = "0"; // Breakfast
    } else if (now.getHours() >= 11 && now.getHours() < 17) {
      meal = "1"; // Lunch
    } else if (now.getHours() >= 22 && now.getHours() < 24) {
      meal = "2"; // Dinner
    } else {
      meal = "-1";
    }

    if (meal === "-1") {
      return res.status(200).json({ message: 'Meal distribution has been closed. Please wait for the next scheduling', data: [] });
    }

    const filteredDistributionData = await Distribution.find({
      meal: meal,
      date: { $gte: new Date(now.toISOString().slice(0, 10)), $lte: new Date(now.toISOString().slice(0, 10)) },
    })
      .populate('student', 'fullName')
      .exec();

      if (filteredDistributionData.length === 0) {
        res.status(200).json({ message: 'You do not have any created form for today.',data:[] });
      } else {
        res.status(200).json({ message: 'Latest distribution data retrieved successfully.', data: filteredDistributionData });
      }

  } catch (err) {
    console.error('Error fetching distribution data:', err);
    res.status(500).json({ message: 'Failed to fetch distribution data.', data: null });
  }
};

const searchDistributionDataByName = async (req, res) => {
  try {
    const searchTerm = req.query.name;

    if (!searchTerm) {
      return res.status(400).json({ message: 'Please provide a search term.', data: [] });
    }

    const student = await Student.findOne({ fullName: { $regex: searchTerm, $options: 'i' } });

    if (!student) {
      return res.status(200).json({ message: 'Student not found.', data: [] });
    }

    const filteredDistributionData = await Distribution.find({ student: student._id })
      .populate('student', 'fullName')
      .exec();

    res.status(200).json({ message: 'Filtered distribution data retrieved successfully.', data: filteredDistributionData });

  } catch (err) {
    console.error('Error fetching distribution data:', err);
    res.status(500).json({ message: 'Failed to fetch distribution data.', data: null });
  }
};


const updateDistributionDataById = async (req, res) => {

  try {
    const distributionId = req.params.id;

    if (!distributionId) {
      return res.status(400).json({ message: 'Please provide a valid distribution ID.' });
    }

    const distributionData = await Distribution.findById(distributionId);

    if (!distributionData) {
      return res.status(404).json({ message: 'Distribution data not found.' });
    }

    distributionData.isServed = !distributionData.isServed;
    await distributionData.save();

    const now = new Date();
    let meal;
    if (now.getHours() >= 8 && now.getHours() < 11) {
      meal = "0"; // Breakfast
    } else if (now.getHours() >= 11 && now.getHours() < 17) {
      meal = "1"; // Lunch
    } else if (now.getHours() >= 22 && now.getHours() < 24) {
      meal = "2"; // Dinner
    } else {
      meal = "-1";
    }

    if (meal === "-1") {
      return res.status(200).json({ message: 'Meal distribution has been closed. Please wait for the next scheduling.', data: [] });
    }

    const filteredDistributionData = await Distribution.find({
      meal: meal,
      date: { $gte: new Date(now.toISOString().slice(0, 10)), $lte: new Date(now.toISOString().slice(0, 10)) },
    })
      .populate('student', 'fullName')
      .exec();

    res.status(200).json({ message: 'Distribution data updated and filtered successfully.', data: filteredDistributionData });

  } catch (err) {
    console.error('Error updating distribution data:', err);
    res.status(500).json({ message: 'Failed to update distribution data.', data: null });
  }
};

const searchDistributionDataByDate = async (req, res) => {
  try {
    const { date } = req.body;
    const inputDate = new Date(date);
    if (isNaN(inputDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Please provide a valid date.' });
    }


    const distributionData = await Distribution.find({ date: inputDate })
      .populate('food', 'name');

    if (!distributionData || distributionData.length === 0) {
      return res.status(404).json({ error: 'No distribution data found for the specified date.' });
    }
    return res.status(200).json({ data: distributionData });
  } catch (error) {
    console.error('Error searching distribution data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  createDistributionData,
  getDistributionData,
  searchDistributionDataByName,
  updateDistributionDataById,
  searchDistributionDataByDate
};
