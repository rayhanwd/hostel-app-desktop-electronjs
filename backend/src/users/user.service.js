const User = require('./user.model');

module.exports.createUser = (userInfo) => {
  return User.create(userInfo);
};

module.exports.findUserByEmail = (email) => {
  return User.findOne({ email: email });
};

module.exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw new Error('Internal server error');
  }
};

module.exports.updateUser = async (userId, updateData) => {
  try {
 
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true, 
      runValidators: true,
    });

    if (!updatedUser) {
      throw new Error('User not found.');
    }

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Internal server error');
  }
};