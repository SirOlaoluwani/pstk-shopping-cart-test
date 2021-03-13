const { createUserValidationRules } = require("../../validators/user");
const validator = require("../../validators");

const route = require("express").Router();

route.get("/", require("../../controllers/UserController").index);
route.post(
  "/store",
  createUserValidationRules(),
  validator,
  require("../../controllers/UserController").store
);

module.exports = route;
