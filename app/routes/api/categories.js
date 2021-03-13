const {
  createCategoryValidationRules,
  deleteCategoryValidationRules,
} = require("../../validators/category");
const validate = require("../../validators");

const route = require("express").Router();

route.get("/", require("../../controllers/CategoryController").index);
route.post(
  "/store",
  createCategoryValidationRules(),
  validate,
  require("../../controllers/CategoryController").store
);
route.delete(
  "/delete/:categoryId",
  deleteCategoryValidationRules(),
  validate,
  require("../../controllers/CategoryController").destroy
);

module.exports = route;
