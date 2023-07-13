const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

router.post('/login',
  userController.verifyUser,
  (req, res) => {
    res.status(200).json(res.locals.user);
  })

router.post('/signup',
  userController.createUser,
  (req, res) => {
    res.status(200).json(res.locals.user);
  })

module.exports = router;