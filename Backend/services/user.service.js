const userModel = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



async function registerUser(userData) {
  const { name, email, password } = userData;
    const existingUser = await userModel
    .findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
    name,
    email,
    password: hashedPassword
});
  await newUser.save();
  return newUser;
}   

async function LoginUser(email, password) {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
}
module.exports = {
  registerUser,
  LoginUser
};

