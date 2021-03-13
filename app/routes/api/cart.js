const {
  addToCartValidationRules,
  updateCartValidationRules,
  deleteCartValidationRules,
  fetchCartValidationRules,
} = require("../../validators/cart");
const validate = require("../../validators");
const route = require("express").Router();

//Fetch
route.get(
  "/:userId",
  fetchCartValidationRules(),
  validate,
  require("../../controllers/CartController").index
);
route.post(
  "/:userId/add",
  addToCartValidationRules(),
  validate,
  require("../../controllers/CartController").add
);
route.delete(
  "/delete/:cartId",
  deleteCartValidationRules(),
  validate,
  require("../../controllers/CartController").destroy
);
route.put(
  "/update/:cartId",
  updateCartValidationRules(),
  validate,
  require("../../controllers/CartController").update
);

module.exports = route;
