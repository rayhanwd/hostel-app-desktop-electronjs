const Food = require('./foods.model');

module.exports.createFood = async function (food) {
    return Food.create(food);
};

module.exports.getFood = async function (PAGE_SIZE, PAGE_NUMBER) {
    const total = await Food.countDocuments({});
    const foods = await Food.find({}).limit(PAGE_SIZE)
        .skip(PAGE_SIZE * PAGE_NUMBER);
    return {
        total: Math.ceil(total / PAGE_SIZE),
        foods: foods
    }
};

module.exports.getFoodById = async function (foodId) {
    return Food.findById(foodId);
};

module.exports.updateFoodById = async function (foodId, updatedFood) {
    return Food.findByIdAndUpdate(foodId, updatedFood, { new: true });
};

module.exports.deleteFoodById = async function (foodId) {
    return Food.findByIdAndDelete(foodId);
};