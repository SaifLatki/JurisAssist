const {registerUser, LoginUser} = require('../services/user.service');



 const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }         
};

 const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await LoginUser(email, password);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  register,
  login
};