const foodService = require('./foods.service');

module.exports.createFood = async function (req, res) {
    const food = req.body;
    const createFood = await foodService.createFood(food);
    return res.status(200).json(createFood);
};

module.exports.getFood = async function (req, res) {
    const PAGE_SIZE = 3;
    const PAGE_NUMBER = parseInt(req.query.page || "0");
    const foods = await foodService.getFood(PAGE_SIZE,PAGE_NUMBER);
    return res.json(foods);
};

module.exports.getFoodById = async function (req, res) {
    const foodId = req.params.id;
    const food = await foodService.getFoodById(foodId);
    return res.json(food);
};

module.exports.updateFoodById = async function (req, res) {
    const foodId = req.params.id;
    const updatedFood = req.body;
    const food = await foodService.updateFoodById(foodId, updatedFood);
    return res.json(food);
};

module.exports.deleteFoodById = async function (req, res) {
    const foodId = req.params.id;
    const food = await foodService.deleteFoodById(foodId);
    return res.json(food);
};