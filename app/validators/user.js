const { body } = require("express-validator");
const User = require("../models/user");

const validateUserId = (value) => {
  return User.findByPk(value).then((user) => {
    if (!user) {
      return Promise.reject("User does not exist");
    }
  });
};

const createUserValidationRules = () => {
  return [
    body("name"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .custom((value) => {
        return User.findUserByEmail(value).then((user) => {
          if (user) {
            return Promise.reject("email already in use");
          }
        });
      }),
    body("phone").isMobilePhone().optional({ nullable: true }),
  ];
};

module.exports = {
  createUserValidationRules,
  validateUserId,
};
