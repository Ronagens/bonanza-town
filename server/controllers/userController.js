const models = require('../models.js');
const User = models.User;

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username: username, password: password })
    res.locals.user = newUser;
    return next();
  }
  catch (err) {
    if (err.code === 11000) {
      res.locals.user = false;
      return next();
    }
    else {
      console.log('Error in userController.createUser: ', err);
      return next({ log: 'Error in userController.createUser', err});
    }
  }
  
}

userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const loginUser = await User.findOne({ username, password });

    res.locals.user = loginUser;
    return next();
  }
  catch (err) {
    console.log('Error in userController.verifyUser: ', err);
    return next({ log: 'Error in userController.verifyUser', err});
  }
}

module.exports = userController;