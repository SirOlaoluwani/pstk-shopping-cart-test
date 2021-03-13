const User = require("../models/user");
const { body: bodyVal, validationResult } = require("express-validator");

const index = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users) {
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(400).send({
      error: error.toString(),
    });
  }
};

const store = async (req, res) => {
  try {
    const body = req.body;
    const users = await User.create(body);
    if (users) {
      res.status(201).send(users);
    }
  } catch (error) {
    res.status(400).send({
      message: error.toString(),
      error: error,
    });
  }
};

module.exports = {
  index,
  store,
};
