const { body, param } = require("express-validator");
const Cart = require("../models/cart");
const { validateProductId } = require("./products");
const { validateUserId } = require("./user");

const validateCartId = (value) => {
  return Cart.findByPk(value).then((cart) => {
    if (!cart) {
      return Promise.reject("cartId does not exist");
    }
  });
};

const addToCartValidationRules = () => {
  return [
    body("product_id").isNumeric().custom(validateProductId),
    body("quantity").isNumeric(),
    param("userId").custom(validateUserId),
  ];
};

const updateCartValidationRules = () => {
  return [body("quantity").isNumeric(), param("cartId").custom(validateCartId)];
};

const deleteCartValidationRules = () => {
  return [param("cartId").custom(validateCartId)];
};

const fetchCartValidationRules = () => {
  return [param("userId").custom(validateUserId)];
};

module.exports = {
  addToCartValidationRules,
  updateCartValidationRules,
  deleteCartValidationRules,
  fetchCartValidationRules,
};
