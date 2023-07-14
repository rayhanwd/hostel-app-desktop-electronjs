var express = require('express');
var router = express.Router();
const foodController = require('../foods/foods.controller');
const studentController = require('../students/students.controller');

/* GET home page. */
router.get('/', function (req, res) {
  res.send('Welcome to Yoda Hostel service api');
});

//food routes
router.post('/foods', foodController.createFood);
router.get('/foods', foodController.getFood);
router.get('/foods/:id', foodController.getFoodById);
router.put('/foods/:id', foodController.updateFoodById);
router.delete('/foods/:id', foodController.deleteFoodById);

//student routes
router.post('/students', studentController.createStudent);
router.get('/students', studentController.getStudent);
router.get('/students/:id', studentController.getStudentById);
router.put('/students/:id', studentController.updateStudentById);
router.delete('/students/:id', studentController.deleteStudentById);

module.exports = router;

