const { body, param } = require("express-validator");
const Category = require("../models/category");
const Products = require("../models/products");

const validateCategory = async (value) => {
  const categoryExistsError = [];
  for (const category of value) {
    const categoryExists = await Category.findByPk(category);
    if (!categoryExists) {
      categoryExistsError.push(category);
    }
  }
  if (categoryExistsError.length) {
    return Promise.reject(
      `The following categories do not exist: ${categoryExistsError.toString()}`
    );
  }
};

const validateProductId = (value) => {
  return Products.findByPk(value).then((product) => {
    if (!product) {
      return Promise.reject("Product does not exist");
    }
  });
};

const createProductValidationRules = () => {
  return [
    body("name"),
    body("description"),
    body("manufacturer"),
    body("price"),
    body("stockLevel").isNumeric(),
    body("expirationDate").isDate(),
    body("categories").isArray().custom(validateCategory),
    body("sku").custom((value) => {
      return Products.findBySKU(value).then((sku) => {
        if (sku) {
          return Promise.reject("sku already in use");
        }
      });
    }),
  ];
};

const updateProductValidationRules = () => {
  return [
    body("name").optional({ nullable: true }),
    body("description").optional({ nullable: true }),
    body("manufacturer").optional({ nullable: true }),
    body("price").optional({ nullable: true }),
    body("stockLevel").isNumeric().optional({ nullable: true }),
    body("expirationDate").isDate().optional({ nullable: true }),
    body("categories")
      .isArray()
      .custom(validateCategory)
      .optional({ nullable: true }),
    param("productId").custom(validateProductId),
  ];
};

const deleteProductValidationRules = () => {
  return [param("productId").custom(validateProductId)];
};

module.exports = {
  createProductValidationRules,
  updateProductValidationRules,
  deleteProductValidationRules,
  validateProductId,
};
