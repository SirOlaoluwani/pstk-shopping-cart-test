const validate = require("../../validators");
const {
  createProductValidationRules,
  updateProductValidationRules,
  deleteProductValidationRules,
} = require("../../validators/products");

const route = require("express").Router();

route.get("/", require("../../controllers/ProductController").index);
route.post(
  "/store",
  createProductValidationRules(),
  validate,
  require("../../controllers/ProductController").store
);
route.put(
  "/update/:productId",
  updateProductValidationRules(),
  validate,
  require("../../controllers/ProductController").update
);
route.delete(
  "/delete/:productId",
  deleteProductValidationRules(),
  validate,
  require("../../controllers/ProductController").destroy
);

module.exports = route;
