const Food = require('./foods.model');
const cache = require('memory-cache');
module.exports.createFood = async function (food) {
  return Food.create(food);
};

module.exports.getFood = async function (PAGE_SIZE, PAGE_NUMBER, searchQuery) {
  const query = {};

  if (searchQuery) {
    query.name = { $regex: new RegExp(searchQuery, 'i') };
    PAGE_NUMBER = 0;
  }

  try {
    let total;
    let foods;

    if (searchQuery) {

      total = await Food.countDocuments(query);
      foods = await Food.find(query);
      if (total === 1) {
        return {
          total: 1,
          foods: foods,
        };
      } else {
        foods = await Food.find(query)
          .limit(PAGE_SIZE)
          .skip(PAGE_SIZE * PAGE_NUMBER);
        total = await Food.countDocuments(query);
      }
    } else {
      total = await Food.countDocuments();
      foods = await Food.find({})
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * PAGE_NUMBER);
    }

    return {
      total: Math.ceil(total / PAGE_SIZE),
      foods: foods,
    };
  } catch (error) {
    console.error("Error fetching food data:", error);
    return {
      total: 0,
      foods: [],
    };
  }
};

module.exports.getAllFood = async function (searchQuery) {
  try {
    const cacheKey = `food_${searchQuery}`;
    const cachedFoods = cache.get(cacheKey);
    if (cachedFoods) {
      return cachedFoods;
    }
    const filter = {};
    if (searchQuery) {
      filter.name = { $regex: new RegExp(searchQuery, 'i') };
    }

    const foods = await Food.find(filter).exec();

    cache.put(cacheKey, foods, 5 * 60 * 1000);

    return foods;
  } catch (err) {
    console.error('Error fetching food items:', err);
    throw err;
  }
}
module.exports.getFoodById = async function (foodId) {
  return Food.findById(foodId);
};

module.exports.updateFoodById = async function (foodId, updatedFood) {
  return Food.findByIdAndUpdate(foodId, updatedFood, { new: true });
};

module.exports.deleteFoodById = async function (foodId) {
  return Food.findByIdAndDelete(foodId);
};